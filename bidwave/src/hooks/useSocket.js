import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export function useSocket(auctionId, onNewBid, onBidError, onAuctionEnded) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("connect_error", (err) => {
      console.log("❌ Socket error:", err.message);
    });

    socketRef.current.emit("join_auction", auctionId);

    socketRef.current.on("new_bid", (data) => {
      onNewBid(data);
    });

    socketRef.current.on("bid_error", (data) => {
      onBidError(data.message);
    });

    // Listen for auction end
    socketRef.current.on("auction_ended", (data) => {
      if (onAuctionEnded) onAuctionEnded(data);
    });

    return () => {
      socketRef.current.emit("leave_auction", auctionId);
      socketRef.current.disconnect();
    };
  }, [auctionId]);

  const placeBid = (amount, userId, userName) => {
    socketRef.current.emit("place_bid", {
      auctionId,
      amount,
      userId,
      userName,
    });
  };

  return { placeBid };
}
