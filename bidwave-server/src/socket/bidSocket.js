import supabase from "../config/db.js";
import redis from "../config/redis.js";
import { analyzeBid } from "../services/fraudDetection.js";

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("join_auction", async (auctionId) => {
      socket.join(auctionId);
      console.log(`✅ Socket ${socket.id} joined room: ${auctionId}`);
    });

    socket.on("place_bid", async ({ auctionId, amount, userId, userName }) => {
      try {
        console.log("✅ Bid received:", { auctionId, amount, userName });

        const { data: auction } = await supabase
          .from("auctions")
          .select("*")
          .eq("id", auctionId)
          .single();

        if (auction) {
          if (auction.status !== "live") {
            socket.emit("bid_error", { message: "Auction is not live" });
            return;
          }
          if (new Date(auction.ends_at) < new Date()) {
            socket.emit("bid_error", { message: "Auction has ended" });
            return;
          }
          if (amount <= auction.current_price) {
            socket.emit("bid_error", {
              message: `Bid must be higher than ₹${auction.current_price}`,
            });
            return;
          }
          if (auction.seller_id === userId) {
            socket.emit("bid_error", {
              message: "Cannot bid on your own auction",
            });
            return;
          }

          // Save bid
          const { data: bid } = await supabase
            .from("bids")
            .insert([{ auction_id: auctionId, bidder_id: userId, amount }])
            .select()
            .single();

          // Update auction
          await supabase
            .from("auctions")
            .update({
              current_price: amount,
              total_bids: auction.total_bids + 1,
            })
            .eq("id", auctionId);

          // Update Redis
          await redis.set(`auction:${auctionId}:current_bid`, amount);
          await redis.del(`auction:${auctionId}`);

          // ── Run Fraud Detection ──
          const fraudResult = await analyzeBid({
            auction,
            bid,
            bidderId: userId,
            bidAmount: amount,
          });

          // Notify admin if flagged
          if (fraudResult.flagged) {
            io.to("admin_room").emit("auction_flagged", {
              auctionId,
              riskScore: fraudResult.riskScore,
              reasons: fraudResult.reasons,
              bidderName: userName,
            });
          }
        }

        // Broadcast bid to all users in room
        io.to(auctionId).emit("new_bid", {
          auctionId,
          amount,
          bidderName: userName,
          bidId: Date.now(),
          time: new Date().toISOString(),
        });

        console.log(`✅ Broadcasted bid ₹${amount} to room ${auctionId}`);
      } catch (err) {
        console.error("❌ Socket error:", err.message);
        socket.emit("bid_error", { message: err.message });
      }
    });

    socket.on("leave_auction", (auctionId) => {
      socket.leave(auctionId);
    });

    socket.on("join_admin", () => {
      socket.join("admin_room");
      console.log("✅ Admin joined admin_room");
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};
