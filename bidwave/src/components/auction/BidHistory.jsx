import { User } from "lucide-react";

export default function BidHistory({ bids }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Bid History
        <span className="text-xs text-gray-400 font-normal ml-2">
          {bids.length} bids
        </span>
      </p>

      <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
        {bids.map((bid, i) => (
          <div
            key={bid.id}
            className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                <User size={12} className="text-gray-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900 dark:text-white flex items-center gap-1.5">
                  {bid.user}
                  {i === 0 && (
                    <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                      Highest
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{bid.time}</p>
              </div>
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              ₹{bid.amount.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
