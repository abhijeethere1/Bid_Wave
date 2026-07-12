import { User } from "lucide-react";

export default function BidHistory({ bids }) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] mb-4">
        Bid History
        <span className="text-xs text-[#737373] dark:text-[#A0A0A0] font-normal ml-2">
          {bids.length} bids
        </span>
      </p>

      <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
        {bids.map((bid, i) => (
          <div
            key={bid.id}
            className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-all
              ${
                i === 0
                  ? "bg-[#D4AF37]/8 dark:bg-[#FFD700]/10 border border-[#D4AF37]/20 dark:border-[#FFD700]/20"
                  : "bg-[#FAF9F6] dark:bg-[#121212] border border-[#1A1A1A]/5 dark:border-[#E0E0E0]/5"
              }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0
                ${
                  i === 0
                    ? "bg-[#D4AF37]/20 dark:bg-[#FFD700]/15"
                    : "bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10"
                }`}
              >
                <User
                  size={12}
                  className={
                    i === 0
                      ? "text-[#D4AF37] dark:text-[#FFD700]"
                      : "text-[#4B0082] dark:text-[#9D4EDD]"
                  }
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] flex items-center gap-1.5">
                  {bid.user}
                  {i === 0 && (
                    <span className="text-[10px] bg-[#D4AF37] dark:bg-[#FFD700] text-[#1A1A1A] px-1.5 py-0.5 rounded-full leading-none font-bold">
                      Highest
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0] mt-0.5">
                  {bid.time}
                </p>
              </div>
            </div>
            <p
              className={`text-sm font-bold ${i === 0 ? "text-[#D4AF37] dark:text-[#FFD700]" : "text-[#1A1A1A] dark:text-[#E0E0E0]"}`}
            >
              ₹{bid.amount.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
