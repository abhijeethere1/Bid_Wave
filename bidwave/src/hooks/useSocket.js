import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export function useSocket(auctionId, onNewBid, onBidError) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("connect_error", (err) => {
      console.log("❌ Socket connection error:", err.message);
    });

    socketRef.current.emit("join_auction", auctionId);
    console.log("✅ Joining auction room:", auctionId);

    socketRef.current.on("new_bid", (data) => {
      console.log("✅ New bid received:", data);
      onNewBid(data);
    });

    socketRef.current.on("bid_error", (data) => {
      console.log("❌ Bid error:", data);
      onBidError(data.message);
    });

    return () => {
      socketRef.current.emit("leave_auction", auctionId);
      socketRef.current.disconnect();
    };
  }, [auctionId]);

  const placeBid = (amount, userId, userName) => {
    console.log("✅ Placing bid via socket:", {
      auctionId,
      amount,
      userId,
      userName,
    });
    socketRef.current.emit("place_bid", {
      auctionId,
      amount,
      userId,
      userName,
    });
  };

  return { placeBid };
}
