const CATEGORIES = [
  "Electronics",
  "Accessories",
  "Furniture",
  "Home Decor",
  "Sports",
  "Fashion",
  "Books",
  "Other",
];

export default function ItemDetails({ form, onChange }) {
  const inputClass =
    "w-full px-4 py-3 text-sm rounded-xl border border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-[#FAF9F6] dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] placeholder-[#737373] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4B0082]/30 dark:focus:ring-[#9D4EDD]/30 focus:border-[#4B0082] dark:focus:border-[#9D4EDD] transition-all";

  return (
    <div className="space-y-5">
      <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
        Item Details
      </p>

      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
          Item Title{" "}
          <span className="text-[#B22222] dark:text-[#FF6666]">*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="e.g. Sony WH-1000XM5 Headphones"
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
          Description{" "}
          <span className="text-[#B22222] dark:text-[#FF6666]">*</span>
        </label>
        <textarea
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe your item — condition, features, what's included..."
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
          Category <span className="text-[#B22222] dark:text-[#FF6666]">*</span>
        </label>
        <select
          value={form.category}
          onChange={(e) => onChange("category", e.target.value)}
          className={inputClass}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
