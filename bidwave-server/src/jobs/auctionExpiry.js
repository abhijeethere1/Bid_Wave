import cron from "node-cron";
import supabase from "../config/db.js";

export const startAuctionExpiryJob = (io) => {
  cron.schedule("*/30 * * * * *", async () => {
    try {
      console.log("⏱ Checking for expired auctions...");

      const { data: expiredAuctions, error } = await supabase
        .from("auctions")
        .select(`*, bids(id, amount, bidder_id, bidder:users(name))`)
        .eq("status", "live")
        .lt("ends_at", new Date().toISOString());

      if (error) throw error;
      if (!expiredAuctions || expiredAuctions.length === 0) return;

      console.log(`⏱ Found ${expiredAuctions.length} expired auction(s)`);

      for (const auction of expiredAuctions) {
        // 1. Mark auction as ended
        await supabase
          .from("auctions")
          .update({ status: "ended" })
          .eq("id", auction.id);

        // 2. Auto-clear any PENDING fraud flags for this auction
        //    (admin didn't review in time — benefit of doubt)
        const { data: pendingFlags } = await supabase
          .from("flagged_auctions")
          .select("id")
          .eq("auction_id", auction.id)
          .eq("status", "pending");

        if (pendingFlags && pendingFlags.length > 0) {
          await supabase
            .from("flagged_auctions")
            .update({ status: "cleared" })
            .eq("auction_id", auction.id)
            .eq("status", "pending");

          console.log(
            `✅ Auto-cleared ${pendingFlags.length} pending flag(s) for auction ${auction.id}`,
          );
        }

        // 3. Find winning bid
        const sortedBids = auction.bids?.sort((a, b) => b.amount - a.amount);
        const winner = sortedBids?.[0];

        if (winner) {
          const platformFee = Math.round(auction.current_price * 0.05);
          const deliveryCharge = auction.delivery_charge || 0;
          const totalAmount =
            auction.current_price + deliveryCharge + platformFee;

          // 4. Create payment record
          await supabase.from("payments").insert([
            {
              auction_id: auction.id,
              buyer_id: winner.bidder_id,
              seller_id: auction.seller_id,
              auction_amount: auction.current_price,
              delivery_charge: deliveryCharge,
              platform_fee: platformFee,
              total_amount: totalAmount,
              status: "pending",
            },
          ]);

          // 5. Create shipment record
          await supabase.from("shipments").insert([
            {
              auction_id: auction.id,
              status: "awaiting_shipment",
            },
          ]);

          console.log(
            `✅ Auction ${auction.id} ended — Winner: ${winner.bidder?.name} with ₹${winner.amount}`,
          );

          io.to(String(auction.id)).emit("auction_ended", {
            auctionId: auction.id,
            winnerId: winner.bidder_id,
            winnerName: winner.bidder?.name,
            winningBid: winner.amount,
            deliveryFee: deliveryCharge,
            platformFee,
            totalAmount,
          });
        } else {
          console.log(`⚠️ Auction ${auction.id} ended with no bids`);
          io.to(String(auction.id)).emit("auction_ended", {
            auctionId: auction.id,
            winnerId: null,
            winnerName: null,
            winningBid: null,
          });
        }
      }
    } catch (err) {
      console.error("❌ Auction expiry job error:", err.message);
    }
  });

  console.log("✅ Auction expiry job started — runs every 30 seconds");
};
