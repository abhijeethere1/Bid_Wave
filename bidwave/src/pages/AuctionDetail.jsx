import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { DUMMY_AUCTIONS } from "../utils/dummyData";
import useCountdown from "../hooks/useCountdown";

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
  const auction = DUMMY_AUCTIONS.find((a) => a.id === parseInt(id));
  const { ended } = useCountdown(auction?.endsAt);
  const [bids, setBids] = useState(INITIAL_BIDS);

  const handleBid = (amount) => {
    setBids((prev) => [
      { id: Date.now(), user: "You", amount, time: "just now" },
      ...prev,
    ]);
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
        {/* Back */}
        <Link
          to="/auctions"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-orange-500 transition-colors mb-8"
        >
          <ChevronLeft size={15} /> Back to Auctions
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* ── LEFT ── */}
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

          {/* ── RIGHT ── */}
          <div className="space-y-6">
            <AuctionMeta
              title={auction.title}
              category={auction.category}
              seller={auction.seller}
            />

            <div className="border-t border-gray-100 dark:border-gray-800" />

            <BidSection
              currentBid={bids[0].amount}
              startingBid={auction.startingBid}
              totalBids={
                auction.totalBids + bids.filter((b) => b.user === "You").length
              }
              onBid={handleBid}
              ended={ended}
            />

            <div className="border-t border-gray-100 dark:border-gray-800" />

            <AuctionTimer endsAt={auction.endsAt} />

            <div className="border-t border-gray-100 dark:border-gray-800" />

            <DeliveryInfo
              size={auction.size}
              deliveryCharge={auction.deliveryCharge}
              currentBid={bids[0].amount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
