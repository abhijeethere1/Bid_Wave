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
  return (
    <div className="space-y-5">
      <p className="text-sm font-bold text-gray-900 dark:text-white">
        Item Details
      </p>

      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Item Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="e.g. Sony WH-1000XM5 Headphones"
          className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe your item — condition, features, what's included..."
          rows={4}
          className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all resize-none"
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          value={form.category}
          onChange={(e) => onChange("category", e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
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
