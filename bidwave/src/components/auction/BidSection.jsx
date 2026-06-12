import { useState } from "react";
import { TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

export default function BidSection({
  currentBid,
  startingBid,
  totalBids,
  onBid,
  ended,
  status,
}) {
  const [bidAmount, setBidAmount] = useState("");
  const [status2, setStatus2] = useState(null);
  const minBid = currentBid + 100;

  const handleBid = () => {
    const amount = parseInt(bidAmount);
    if (!amount || amount < minBid) {
      setStatus2("error");
      setTimeout(() => setStatus2(null), 3000);
      return;
    }
    onBid(amount);
    setBidAmount("");
  };

  return (
    <div>
      <div className="mb-5">
        <p className="text-xs text-gray-400 flex items-center gap-1 mb-1">
          <TrendingUp size={12} /> Current Bid
        </p>
        <p className="text-4xl font-black text-orange-500">
          ₹{currentBid.toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {totalBids} bids · Started at ₹{startingBid.toLocaleString("en-IN")}
        </p>
      </div>

      {status2 === "success" && (
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400 text-xs px-3 py-2.5 rounded-xl mb-3">
          <CheckCircle size={13} /> Bid placed successfully!
        </div>
      )}
      {status2 === "error" && (
        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-500 text-xs px-3 py-2.5 rounded-xl mb-3">
          <AlertCircle size={13} /> Minimum bid is ₹
          {minBid.toLocaleString("en-IN")}
        </div>
      )}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
            ₹
          </span>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder={`Min. ₹${minBid.toLocaleString("en-IN")}`}
            disabled={ended}
            className="w-full pl-8 pr-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all disabled:opacity-50"
          />
        </div>
        <button
          onClick={handleBid}
          disabled={ended}
          className="px-5 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold text-sm rounded-xl shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 transition-all whitespace-nowrap"
        >
          Bid Now
        </button>
      </div>

      <div className="flex gap-2 mt-2.5">
        {[500, 1000, 2000].map((inc) => (
          <button
            key={inc}
            onClick={() => setBidAmount(String(minBid + inc))}
            disabled={ended}
            className="flex-1 py-2 text-xs font-medium rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-colors disabled:opacity-40"
          >
            +₹{inc}
          </button>
        ))}
      </div>

      <p className="text-[11px] text-gray-400 text-center mt-2">
        Min. bid: ₹{minBid.toLocaleString("en-IN")}
      </p>
    </div>
  );
}
