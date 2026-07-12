import { useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import useCountdown from "../../hooks/useCountdown";
import AuctionResultModal from "./AuctionResultModal";

export default function ListingCard({ listing }) {
  const { hours, minutes } = useCountdown(listing.endsAt);
  const [showModal, setShowModal] = useState(false);

  const subtext =
    {
      live: `⏱ Ends in ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`,
      awaiting_shipment: "📦 Ship to our fulfillment center",
      ended: "Auction has ended",
    }[listing.status] || "—";

  return (
    <>
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/8 dark:border-[#9D4EDD]/15 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(75,0,130,0.04)] hover:shadow-[0_4px_20px_rgba(75,0,130,0.08)] transition-shadow">
        <div className="p-5 flex flex-col" style={{ height: "140px" }}>
          {/* Top Row */}
          <div className="flex items-start gap-4">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#4B0082]/8 dark:border-[#9D4EDD]/10"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-snug truncate">
                {listing.title}
              </p>
              <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0] mt-0.5">
                {listing.totalBids} bids placed
              </p>
            </div>
            <StatusBadge status={listing.status} />
          </div>

          <div className="flex-1" />

          {/* Bottom Row */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <p
                className={`text-xs font-medium mb-1 ${
                  listing.status === "ended"
                    ? "text-[#737373] dark:text-[#A0A0A0]"
                    : "text-[#D4AF37] dark:text-[#FFD700]"
                }`}
              >
                {subtext}
              </p>
              <p className="text-sm font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
                ₹{listing.currentBid.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0]">
                current bid
              </p>
            </div>

            <div className="shrink-0">
              {listing.status === "live" && (
                <Link
                  to={`/auctions/${listing.id}`}
                  className="px-4 py-2 border border-[#4B0082]/15 dark:border-[#9D4EDD]/20 text-[#4B0082] dark:text-[#9D4EDD] text-xs font-semibold rounded-xl hover:border-[#D4AF37]/40 dark:hover:border-[#FFD700]/30 hover:text-[#D4AF37] dark:hover:text-[#FFD700] transition-all"
                >
                  View Auction
                </Link>
              )}
              {listing.status === "awaiting_shipment" && (
                <button className="px-4 py-2 bg-[#D4AF37] dark:bg-[#FFD700] hover:brightness-110 text-[#1A1A1A] text-xs font-bold rounded-xl transition-all shadow-[0_2px_8px_rgba(212,175,55,0.25)]">
                  Mark Shipped
                </button>
              )}
              {listing.status === "ended" && (
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 border border-[#4B0082]/15 dark:border-[#9D4EDD]/20 text-[#4B0082] dark:text-[#9D4EDD] text-xs font-semibold rounded-xl hover:border-[#D4AF37]/40 dark:hover:border-[#FFD700]/30 hover:text-[#D4AF37] dark:hover:text-[#FFD700] transition-all"
                >
                  View Results
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AuctionResultModal
          auctionId={listing.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
