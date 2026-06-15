import cron from "node-cron";
import supabase from "../config/db.js";

export const startAuctionExpiryJob = (io) => {
  // Runs every 30 seconds
  cron.schedule("*/30 * * * * *", async () => {
    try {
      console.log("⏱ Checking for expired auctions...");

      // Find all live auctions that have passed their end time
      const { data: expiredAuctions, error } = await supabase
        .from("auctions")
        .select(
          `
          *,
          bids(id, amount, bidder_id, bidder:users(name))
        `,
        )
        .eq("status", "live")
        .lt("ends_at", new Date().toISOString());

      if (error) throw error;
      if (!expiredAuctions || expiredAuctions.length === 0) return;

      console.log(`⏱ Found ${expiredAuctions.length} expired auction(s)`);

      for (const auction of expiredAuctions) {
        // Update auction status to ended
        await supabase
          .from("auctions")
          .update({ status: "ended" })
          .eq("id", auction.id);

        // Find winning bid (highest amount)
        const sortedBids = auction.bids?.sort((a, b) => b.amount - a.amount);
        const winner = sortedBids?.[0];

        if (winner) {
          // Create payment record for winner
          const platformFee = Math.round(auction.current_price * 0.05); // 5% commission
          const deliveryCharge = auction.delivery_charge || 0;
          const totalAmount =
            auction.current_price + deliveryCharge + platformFee;

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

          // Create shipment record
          await supabase.from("shipments").insert([
            {
              auction_id: auction.id,
              status: "awaiting_shipment",
            },
          ]);

          console.log(
            `✅ Auction ${auction.id} ended — Winner: ${winner.bidder?.name} with ₹${winner.amount}`,
          );

          // Broadcast to all users in this auction room
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
          // No bids — auction ended with no winner
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
