import { useState } from "react";
import { TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

export default function BidSection({
  currentBid,
  startingBid,
  totalBids,
  onBid,
  ended,
}) {
  const [bidAmount, setBidAmount] = useState("");
  const [status, setStatus] = useState(null);
  const minBid = currentBid + 100;

  const handleBid = () => {
    const amount = parseInt(bidAmount);
    if (!amount || amount < minBid) {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
      return;
    }
    onBid(amount);
    setStatus("success");
    setBidAmount("");
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div>
      {/* Current Bid */}
      <div className="mb-5">
        <p className="text-xs text-[#737373] dark:text-[#A0A0A0] flex items-center gap-1 mb-1">
          <TrendingUp size={12} /> Current Bid
        </p>
        <p className="font-display text-4xl font-black text-[#D4AF37] dark:text-[#FFD700]">
          ₹{currentBid.toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mt-1">
          {totalBids} bids · Started at ₹{startingBid.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Status */}
      {status === "success" && (
        <div className="flex items-center gap-2 bg-[#2E8B57]/8 dark:bg-[#4EBA75]/10 border border-[#2E8B57]/20 dark:border-[#4EBA75]/20 text-[#2E8B57] dark:text-[#4EBA75] text-xs px-3 py-2.5 rounded-xl mb-3">
          <CheckCircle size={13} /> Bid placed successfully!
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 bg-[#B22222]/8 dark:bg-[#FF6666]/10 border border-[#B22222]/20 dark:border-[#FF6666]/20 text-[#B22222] dark:text-[#FF6666] text-xs px-3 py-2.5 rounded-xl mb-3">
          <AlertCircle size={13} /> Minimum bid is ₹
          {minBid.toLocaleString("en-IN")}
        </div>
      )}

      {/* Input + Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0] text-sm font-medium">
            ₹
          </span>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder={`Min. ₹${minBid.toLocaleString("en-IN")}`}
            disabled={ended}
            className="w-full pl-8 pr-4 py-3 text-sm rounded-xl border border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-[#FAF9F6] dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] placeholder-[#737373] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 dark:focus:ring-[#FFD700]/30 focus:border-[#D4AF37] dark:focus:border-[#FFD700] transition-all disabled:opacity-50"
          />
        </div>
        <button
          onClick={handleBid}
          disabled={ended}
          className="px-5 py-3 bg-[#D4AF37] dark:bg-[#FFD700] hover:brightness-110 disabled:opacity-50 text-[#1A1A1A] font-bold text-sm rounded-xl shadow-[0_4px_16px_rgba(212,175,55,0.30)] transition-all whitespace-nowrap"
        >
          Bid Now
        </button>
      </div>

      {/* Quick Bids */}
      <div className="flex gap-2 mt-2.5">
        {[500, 1000, 2000].map((inc) => (
          <button
            key={inc}
            onClick={() => setBidAmount(String(minBid + inc))}
            disabled={ended}
            className="flex-1 py-2 text-xs font-medium rounded-xl bg-[#D4AF37]/8 dark:bg-[#FFD700]/10 text-[#D4AF37] dark:text-[#FFD700] hover:bg-[#D4AF37]/15 dark:hover:bg-[#FFD700]/20 border border-[#D4AF37]/15 dark:border-[#FFD700]/15 transition-colors disabled:opacity-40"
          >
            +₹{inc}
          </button>
        ))}
      </div>

      <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0] text-center mt-2.5">
        Min. bid: ₹{minBid.toLocaleString("en-IN")}
      </p>
    </div>
  );
}
