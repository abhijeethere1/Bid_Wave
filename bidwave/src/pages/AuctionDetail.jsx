import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "../context/AuthContext";
import useCountdown from "../hooks/useCountdown";
import toast from "react-hot-toast";
import api from "../utils/api";

import AuctionImages from "../components/auction/AuctionImages";
import AuctionMeta from "../components/auction/AuctionMeta";
import AuctionTimer from "../components/auction/AuctionTimer";
import BidSection from "../components/auction/BidSection";
import BidHistory from "../components/auction/BidHistory";
import DeliveryInfo from "../components/auction/DeliveryInfo";

export default function AuctionDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [winner, setWinner] = useState(null);

  const { ended } = useCountdown(auction?.ends_at);

  // Fetch auction from backend
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await api.get(`/auctions/${id}`);
        setAuction(res.data);

        // Format bids from DB
        if (res.data.bids && res.data.bids.length > 0) {
          const formatted = res.data.bids
            .sort((a, b) => b.amount - a.amount)
            .map((bid) => ({
              id: bid.id,
              user: bid.bidder?.name || "Anonymous",
              amount: bid.amount,
              time: new Date(bid.created_at).toLocaleTimeString(),
            }));
          setBids(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch auction:", err);
      }
      setLoading(false);
    };
    fetchAuction();
  }, [id]);

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

  const handleBidError = (message) => {
    toast.error(message);
  };

  const handleAuctionEnded = (data) => {
    setAuctionEnded(true);
    setWinner(data);
    if (data.winnerName) {
      toast.success(`🎉 Auction ended! Winner: ${data.winnerName}`);
    } else {
      toast.error("Auction ended with no bids");
    }
  };

  const { placeBid } = useSocket(
    String(id),
    handleNewBid,
    handleBidError,
    handleAuctionEnded,
  );

  const handleBid = (amount) => {
    if (!user) {
      toast.error("Please login to place a bid");
      return;
    }
    placeBid(amount, user.id, user.name);
  };

  // Loading state
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading auction...</p>
        </div>
      </div>
    );

  // Not found
  if (!auction)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Auction not found
          </p>
          <Link
            to="/auctions"
            className="text-orange-500 text-sm mt-2 block hover:underline"
          >
            Back to Auctions
          </Link>
        </div>
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

        {/* Auction Ended Banner */}
        {auctionEnded && (
          <div
            className={`mb-6 rounded-2xl p-5 border ${
              winner?.winnerId
                ? "bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20"
                : "bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                  winner?.winnerId
                    ? "bg-green-100 dark:bg-green-500/20"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {winner?.winnerId ? "🏆" : "⏱"}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {winner?.winnerId
                    ? "Auction Ended — We have a winner!"
                    : "Auction Ended — No bids placed"}
                </p>
                {winner?.winnerId && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {winner.winnerName}
                    </span>{" "}
                    won with ₹{winner.winningBid?.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </div>
            {winner?.totalAmount && (
              <div className="mt-4 pt-4 border-t border-green-100 dark:border-green-500/20 grid grid-cols-3 gap-4 text-center">
                {[
                  {
                    label: "Winning Bid",
                    value: `₹${winner.winningBid?.toLocaleString("en-IN")}`,
                  },
                  { label: "Delivery Fee", value: `₹${winner.deliveryFee}` },
                  {
                    label: "Total Payable",
                    value: `₹${winner.totalAmount?.toLocaleString("en-IN")}`,
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p
                      className={`text-sm font-bold mt-0.5 ${item.label === "Total Payable" ? "text-orange-500" : "text-gray-900 dark:text-white"}`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="space-y-8">
            <AuctionImages
              images={auction.images || []}
              title={auction.title}
            />
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

          {/* RIGHT */}
          <div className="space-y-6">
            <AuctionMeta
              title={auction.title}
              category={auction.category}
              seller={auction.seller?.name || "Unknown"}
            />
            <div className="border-t border-gray-100 dark:border-gray-800" />
            <BidSection
              currentBid={bids[0]?.amount || auction.current_price}
              startingBid={auction.starting_price}
              totalBids={auction.total_bids}
              onBid={handleBid}
              ended={ended || auctionEnded}
            />
            <div className="border-t border-gray-100 dark:border-gray-800" />
            <AuctionTimer endsAt={auction.ends_at} />
            <div className="border-t border-gray-100 dark:border-gray-800" />
            <DeliveryInfo
              size={auction.size}
              deliveryCharge={auction.delivery_charge}
              currentBid={bids[0]?.amount || auction.current_price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
