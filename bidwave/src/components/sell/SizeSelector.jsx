const SIZES = [
  {
    value: "Small",
    label: "Small",
    icon: "📦",
    desc: "Fits in a shoebox · under 1kg",
    fee: 80,
  },
  {
    value: "Medium",
    label: "Medium",
    icon: "🗃️",
    desc: "Fits in a suitcase · 1–5kg",
    fee: 150,
  },
  {
    value: "Large",
    label: "Large",
    icon: "🚚",
    desc: "Large furniture · 5–20kg",
    fee: 400,
  },
  {
    value: "Extra",
    label: "Extra",
    icon: "🏗️",
    desc: "Machinery/vehicles · custom quote",
    fee: null,
  },
];

export default function SizeSelector({ value, onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-900 dark:text-white block mb-3">
        Item Size <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 gap-2.5">
        {SIZES.map((size) => (
          <button
            key={size.value}
            type="button"
            onClick={() => onChange(size.value)}
            className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border-2 text-center transition-all
    ${
      value === size.value
        ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
        : "border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500/40"
    }`}
          >
            <span className="text-2xl">{size.icon}</span>
            <div>
              <p
                className={`text-sm font-bold ${value === size.value ? "text-orange-500" : "text-gray-900 dark:text-white"}`}
              >
                {size.label}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                {size.desc}
              </p>
              <p
                className={`text-xs font-semibold mt-1 ${value === size.value ? "text-orange-500" : "text-gray-500"}`}
              >
                {size.fee ? `₹${size.fee} delivery` : "Custom quote"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
