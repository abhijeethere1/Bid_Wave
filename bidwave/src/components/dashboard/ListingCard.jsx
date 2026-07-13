import { useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import useCountdown from "../../hooks/useCountdown";
import AuctionResultModal from "./AuctionResultModal";

// Extended status map for seller-specific statuses
const SELLER_STATUS = {
  live: {
    label: "Live",
    color: "text-white bg-[#4B0082] dark:bg-[#9D4EDD]",
  },
  payment_pending_buyer: {
    label: "Awaiting Payment",
    color:
      "text-[#8A6B18] dark:text-[#FFD700] bg-[#D4AF37]/10 dark:bg-[#FFD700]/10",
  },
  awaiting_shipment: {
    label: "Ship to Center",
    color:
      "text-[#8A6B18] dark:text-[#FFD700] bg-[#D4AF37]/10 dark:bg-[#FFD700]/10",
  },
  payment_released: {
    label: "Paid Out",
    color:
      "text-[#2E8B57] dark:text-[#4EBA75] bg-[#2E8B57]/8 dark:bg-[#4EBA75]/10",
  },
  ended: {
    label: "No Bids",
    color:
      "text-[#737373] dark:text-[#A0A0A0] bg-[#1A1A1A]/6 dark:bg-[#E0E0E0]/8",
  },
};

// Seller-side progress steps
const SELLER_STEPS = {
  payment_pending_buyer: {
    step: 1,
    label: "Waiting for buyer to complete payment",
  },
  awaiting_shipment: {
    step: 2,
    label: "Ship the item to our fulfillment center",
  },
  payment_released: { step: 3, label: "Payment released to your account" },
};

export default function ListingCard({ listing }) {
  const { hours, minutes } = useCountdown(listing.endsAt);
  const [showModal, setShowModal] = useState(false);

  const sellerStatus = SELLER_STATUS[listing.status] || SELLER_STATUS.ended;
  const step = SELLER_STEPS[listing.status];

  return (
    <>
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/8 dark:border-[#9D4EDD]/15 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(75,0,130,0.04)] hover:shadow-[0_4px_20px_rgba(75,0,130,0.08)] transition-shadow">
        {/* Ship Now Banner */}
        {listing.status === "awaiting_shipment" && (
          <div className="flex items-center justify-between px-5 py-3 bg-[#D4AF37]/8 dark:bg-[#FFD700]/8 border-b border-[#D4AF37]/15 dark:border-[#FFD700]/15">
            <p className="text-xs font-medium text-[#8A6B18] dark:text-[#FFD700]">
              📦 Buyer paid! Ship the item to our fulfillment center now.
            </p>
          </div>
        )}

        <div className="p-5 flex flex-col" style={{ minHeight: "140px" }}>
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

            {/* Status Badge */}
            <span
              className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${sellerStatus.color}`}
            >
              {sellerStatus.label}
            </span>
          </div>

          {/* Progress bar for post-auction states */}
          {step && (
            <div className="mt-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      n <= step.step
                        ? "bg-[#D4AF37] dark:bg-[#FFD700]"
                        : "bg-[#1A1A1A]/8 dark:bg-[#E0E0E0]/8"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0]">
                {step.label}
              </p>
            </div>
          )}

          <div className="flex-1" />

          {/* Bottom Row */}
          <div className="flex items-end justify-between gap-4 mt-3">
            <div className="flex-1">
              {/* Live countdown */}
              {listing.status === "live" && (
                <p className="text-xs font-medium text-[#4B0082] dark:text-[#9D4EDD] mb-1">
                  ⏱ Ends in {String(hours).padStart(2, "0")}h{" "}
                  {String(minutes).padStart(2, "0")}m
                </p>
              )}

              {/* No bids */}
              {listing.status === "ended" && (
                <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mb-1">
                  No bids — auction ended
                </p>
              )}

              <p className="text-sm font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
                ₹{listing.currentBid.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0]">
                {listing.status === "live" ? "current bid" : "final bid"}
              </p>
            </div>

            {/* Actions */}
            <div className="shrink-0 flex flex-col gap-1.5">
              {listing.status === "live" && (
                <Link
                  to={`/auctions/${listing.id}`}
                  className="px-4 py-2 border border-[#4B0082]/15 dark:border-[#9D4EDD]/20 text-[#4B0082] dark:text-[#9D4EDD] text-xs font-semibold rounded-xl hover:border-[#D4AF37]/40 hover:text-[#D4AF37] dark:hover:text-[#FFD700] transition-all text-center"
                >
                  View Auction
                </Link>
              )}

              {listing.status === "awaiting_shipment" && (
                <button className="px-4 py-2 bg-[#D4AF37] dark:bg-[#FFD700] hover:brightness-110 text-[#1A1A1A] text-xs font-bold rounded-xl transition-all shadow-[0_2px_8px_rgba(212,175,55,0.25)]">
                  Mark Shipped
                </button>
              )}

              {(listing.status === "ended" ||
                listing.status === "payment_pending_buyer" ||
                listing.status === "payment_released") && (
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 border border-[#4B0082]/15 dark:border-[#9D4EDD]/20 text-[#4B0082] dark:text-[#9D4EDD] text-xs font-semibold rounded-xl hover:border-[#D4AF37]/40 hover:text-[#D4AF37] dark:hover:text-[#FFD700] transition-all text-center"
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
