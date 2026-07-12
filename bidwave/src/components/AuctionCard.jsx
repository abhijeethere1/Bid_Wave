import { Link } from "react-router-dom";
import { Clock, TrendingUp, Package } from "lucide-react";
import useCountdown from "../hooks/useCountdown";

export default function AuctionCard({ auction }) {
  const { hours, minutes, seconds, ended } = useCountdown(
    auction.endsAt || auction.ends_at,
  );
  const isUrgent = hours === 0 && minutes < 30;
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <Link to={`/auctions/${auction.id}`} className="group block">
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/8 dark:border-[#9D4EDD]/15 rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 dark:hover:border-[#FFD700]/30 hover:shadow-[0_8px_32px_rgba(212,175,55,0.12)] dark:hover:shadow-[0_8px_32px_rgba(255,215,0,0.08)] hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={
              auction.images?.[0] ||
              auction.image ||
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&fit=crop"
            }
            alt={auction.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Live Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#B22222] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
          {/* Category */}
          <div className="absolute top-3 right-3 bg-[#121212]/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            {auction.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] text-sm leading-snug mb-3 line-clamp-1">
            {auction.title}
          </h3>

          {/* Bid & Timer */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0] flex items-center gap-1 mb-0.5">
                <TrendingUp size={11} /> Current Bid
              </p>
              <p className="text-xl font-black text-[#D4AF37] dark:text-[#FFD700]">
                ₹
                {(
                  auction.currentBid ||
                  auction.current_price ||
                  0
                ).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0] flex items-center justify-end gap-1 mb-0.5">
                <Clock size={11} /> Ends In
              </p>
              <p
                className={`text-sm font-black font-mono ${isUrgent ? "text-[#B22222] dark:text-[#FF6666]" : "text-[#1A1A1A] dark:text-[#E0E0E0]"}`}
              >
                {ended
                  ? "Ended"
                  : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[#4B0082]/8 dark:border-[#9D4EDD]/10">
            <span className="text-[11px] text-[#737373] dark:text-[#A0A0A0]">
              {auction.totalBids || auction.total_bids || 0} bids
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[#737373] dark:text-[#A0A0A0]">
              <Package size={11} />
              {auction.size} · ₹
              {auction.deliveryCharge || auction.delivery_charge} delivery
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
