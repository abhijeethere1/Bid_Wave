import { Link } from "react-router-dom";
import { Clock, TrendingUp, Package } from "lucide-react";
import useCountdown from "../hooks/useCountdown";

function AuctionCard({ auction }) {
  const { hours, minutes, seconds, ended } = useCountdown(auction.endsAt);

  const isUrgent = hours === 0 && minutes < 30;

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <Link to={`/auctions/${auction.id}`} className="group block">
      <div className="bg-white dark:bg-gray-900 border border-orange-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-orange-300 dark:hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={auction.image}
            alt={auction.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Live Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {auction.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug mb-3 line-clamp-1">
            {auction.title}
          </h3>

          {/* Bid & Timer Row */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-0.5">
                <TrendingUp size={11} /> Current Bid
              </p>
              <p className="text-xl font-black text-orange-500">
                ₹{auction.currentBid.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 flex items-center justify-end gap-1 mb-0.5">
                <Clock size={11} /> Ends In
              </p>
              <p
                className={`text-base font-black font-mono ${isUrgent ? "text-red-500" : "text-gray-900 dark:text-white"}`}
              >
                {ended
                  ? "Ended"
                  : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <span className="text-xs text-gray-400">
              {auction.totalBids} bids
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Package size={11} />
              {auction.size} · ₹{auction.deliveryCharge} delivery
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AuctionCard;
