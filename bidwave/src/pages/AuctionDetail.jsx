import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { DUMMY_AUCTIONS } from "../utils/dummyData";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "../context/AuthContext";
import useCountdown from "../hooks/useCountdown";
import toast from "react-hot-toast";

import AuctionImages from "../components/auction/AuctionImages";
import AuctionMeta from "../components/auction/AuctionMeta";
import AuctionTimer from "../components/auction/AuctionTimer";
import BidSection from "../components/auction/BidSection";
import BidHistory from "../components/auction/BidHistory";
import DeliveryInfo from "../components/auction/DeliveryInfo";

const INITIAL_BIDS = [
  { id: 1, user: "Rohan M.", amount: 12400, time: "2 mins ago" },
  { id: 2, user: "Sneha R.", amount: 11800, time: "5 mins ago" },
  { id: 3, user: "Arjun P.", amount: 11200, time: "12 mins ago" },
  { id: 4, user: "Priya S.", amount: 10500, time: "18 mins ago" },
  { id: 5, user: "Karan B.", amount: 9800, time: "25 mins ago" },
];

export default function AuctionDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const auction = DUMMY_AUCTIONS.find((a) => a.id === parseInt(id));
  const { ended } = useCountdown(auction?.endsAt);
  const [bids, setBids] = useState(INITIAL_BIDS);

  // Handle incoming real-time bid
  const handleNewBid = (data) => {
    setBids((prev) => [
      {
        id: data.bidId,
        user: data.bidderName,
        amount: data.amount,
        time: "just now",
      },
      ...prev,
    ]);
    toast.success(`New bid: ₹${data.amount.toLocaleString("en-IN")}`);
  };

  // Handle bid error from socket
  const handleBidError = (message) => {
    toast.error(message);
  };

  // Connect socket
  const { placeBid } = useSocket(String(id), handleNewBid, handleBidError);

  // Place bid — send via socket
  const handleBid = (amount) => {
    if (!user) {
      toast.error("Please login to place a bid");
      return;
    }
    placeBid(amount, user.id, user.name);
  };

  if (!auction)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400">Auction not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link
          to="/auctions"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-orange-500 transition-colors mb-8"
        >
          <ChevronLeft size={15} /> Back to Auctions
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <AuctionImages image={auction.image} title={auction.title} />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {auction.description}
              </p>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <BidHistory bids={bids} />
            </div>
          </div>

          <div className="space-y-6">
            <AuctionMeta
              title={auction.title}
              category={auction.category}
              seller={auction.seller}
            />
            <div className="border-t border-gray-100 dark:border-gray-800" />
            <BidSection
              currentBid={bids[0]?.amount || auction.currentBid}
              startingBid={auction.startingBid}
              totalBids={bids.length}
              onBid={handleBid}
              ended={ended}
            />
            <div className="border-t border-gray-100 dark:border-gray-800" />
            <AuctionTimer endsAt={auction.endsAt} />
            <div className="border-t border-gray-100 dark:border-gray-800" />
            <DeliveryInfo
              size={auction.size}
              deliveryCharge={auction.deliveryCharge}
              currentBid={bids[0]?.amount || auction.currentBid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
