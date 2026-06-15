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
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="p-5 flex flex-col" style={{ height: "140px" }}>
          {/* Top Row */}
          <div className="flex items-start gap-4">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-100 dark:border-gray-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-snug truncate">
                {listing.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {listing.totalBids} bids placed
              </p>
            </div>
            <StatusBadge status={listing.status} />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom Row */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <p
                className={`text-xs font-medium mb-1 ${listing.status === "ended" ? "text-gray-400" : "text-orange-500"}`}
              >
                {subtext}
              </p>
              <p className="text-sm font-black text-gray-900 dark:text-white">
                ₹{listing.currentBid.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-gray-400">current bid</p>
            </div>

            <div className="shrink-0">
              {listing.status === "live" && (
                <Link
                  to={`/auctions/${listing.id}`}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-semibold rounded-xl hover:border-orange-400 hover:text-orange-500 transition-all"
                >
                  View Auction
                </Link>
              )}
              {listing.status === "awaiting_shipment" && (
                <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-orange-500/20">
                  Mark Shipped
                </button>
              )}
              {listing.status === "ended" && (
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-semibold rounded-xl hover:border-orange-400 hover:text-orange-500 transition-all"
                >
                  View Results
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {showModal && (
        <AuctionResultModal
          auctionId={listing.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
