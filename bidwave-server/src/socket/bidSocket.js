import supabase from "../config/db.js";
import redis from "../config/redis.js";

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

        // Try to find auction in DB
        const { data: auction } = await supabase
          .from("auctions")
          .select("*")
          .eq("id", auctionId)
          .single();

        // If auction exists in DB, validate properly
        if (auction) {
          if (auction.status !== "live") {
            socket.emit("bid_error", { message: "Auction has ended" });
            return;
          }
          if (new Date(auction.ends_at) < new Date()) {
            socket.emit("bid_error", { message: "Auction time has expired" });
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

          // Save to DB
          await supabase
            .from("bids")
            .insert([{ auction_id: auctionId, bidder_id: userId, amount }]);

          await supabase
            .from("auctions")
            .update({
              current_price: amount,
              total_bids: auction.total_bids + 1,
            })
            .eq("id", auctionId);

          await redis.set(`auction:${auctionId}:current_bid`, amount);
          await redis.del(`auction:${auctionId}`);
        }

        // Whether in DB or dummy — broadcast to all in room
        io.to(auctionId).emit("new_bid", {
          auctionId,
          amount,
          bidderName: userName,
          bidId: Date.now(),
          time: new Date().toISOString(),
        });

        console.log(`✅ Broadcasted bid ₹${amount} to room ${auctionId}`);
      } catch (err) {
        console.log("❌ Socket error:", err.message);
        socket.emit("bid_error", { message: err.message });
      }
    });

    socket.on("leave_auction", (auctionId) => {
      socket.leave(auctionId);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};
