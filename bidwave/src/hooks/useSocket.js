import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export function useSocket(
  auctionId,
  onNewBid,
  onBidError,
  onAuctionEnded,
  onBidReversed,
) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.emit("join_auction", auctionId);

    socketRef.current.on("new_bid", (data) => onNewBid(data));
    socketRef.current.on("bid_error", (data) => onBidError(data.message));
    socketRef.current.on("auction_ended", (data) => {
      if (onAuctionEnded) onAuctionEnded(data);
    });

    // Listen for bid reversal
    socketRef.current.on("bid_reversed", (data) => {
      if (onBidReversed) onBidReversed(data);
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
