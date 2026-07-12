export default function PricingSection({ form, onChange }) {
  const now = new Date();
  const minDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  return (
    <div className="space-y-5">
      <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
        Pricing & Duration
      </p>

      {/* Starting Price */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
          Starting Price{" "}
          <span className="text-[#B22222] dark:text-[#FF6666]">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0] text-sm font-medium">
            ₹
          </span>
          <input
            type="number"
            value={form.startingPrice}
            onChange={(e) => onChange("startingPrice", e.target.value)}
            placeholder="e.g. 5000"
            className="w-full pl-8 pr-4 py-3 text-sm rounded-xl border border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-[#FAF9F6] dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] placeholder-[#737373] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4B0082]/30 dark:focus:ring-[#9D4EDD]/30 focus:border-[#4B0082] dark:focus:border-[#9D4EDD] transition-all"
          />
        </div>
      </div>

      {/* Auction End Time */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
          Auction Ends At{" "}
          <span className="text-[#B22222] dark:text-[#FF6666]">*</span>
        </label>
        <input
          type="datetime-local"
          value={form.duration}
          min={minDateTime}
          onChange={(e) => onChange("duration", e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-xl border border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-[#FAF9F6] dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#4B0082]/30 dark:focus:ring-[#9D4EDD]/30 focus:border-[#4B0082] dark:focus:border-[#9D4EDD] transition-all"
        />
        {form.duration && (
          <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mt-1">
            Ends on{" "}
            <span className="text-[#D4AF37] dark:text-[#FFD700] font-medium">
              {new Date(form.duration).toLocaleString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
