export default function PricingSection({ form, onChange }) {
  // Set minimum datetime to now
  const now = new Date();
  const minDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  return (
    <div className="space-y-5">
      <p className="text-sm font-bold text-gray-900 dark:text-white">
        Pricing & Duration
      </p>

      {/* Starting Price */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Starting Price <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
            ₹
          </span>
          <input
            type="number"
            value={form.startingPrice}
            onChange={(e) => onChange("startingPrice", e.target.value)}
            placeholder="e.g. 5000"
            className="w-full pl-8 pr-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
          />
        </div>
      </div>

      {/* Auction End Time */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Auction Ends At <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          value={form.duration}
          min={minDateTime}
          onChange={(e) => onChange("duration", e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
        />
        {form.duration && (
          <p className="text-xs text-gray-400 mt-1">
            Auction will end on{" "}
            <span className="text-orange-500 font-medium">
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
