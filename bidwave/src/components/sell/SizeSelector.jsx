const SIZES = [
  {
    value: "Small",
    icon: "📦",
    desc: "Fits in a shoebox · under 1kg",
    fee: 80,
  },
  { value: "Medium", icon: "🗃️", desc: "Fits in a suitcase · 1–5kg", fee: 150 },
  { value: "Large", icon: "🚚", desc: "Large furniture · 5–20kg", fee: 400 },
  {
    value: "Extra",
    icon: "🏗️",
    desc: "Machinery/vehicles · custom quote",
    fee: null,
  },
];

export default function SizeSelector({ value, onChange }) {
  return (
    <div>
      <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-3">
        Item Size <span className="text-[#B22222] dark:text-[#FF6666]">*</span>
      </p>
      <div className="grid grid-cols-2 gap-3">
        {SIZES.map((size) => (
          <button
            key={size.value}
            type="button"
            onClick={() => onChange(size.value)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all
              ${
                value === size.value
                  ? "border-[#D4AF37] dark:border-[#FFD700] bg-[#D4AF37]/8 dark:bg-[#FFD700]/10"
                  : "border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 hover:border-[#4B0082]/30 dark:hover:border-[#9D4EDD]/30"
              }`}
          >
            <span className="text-2xl">{size.icon}</span>
            <div>
              <p
                className={`text-sm font-bold ${value === size.value ? "text-[#D4AF37] dark:text-[#FFD700]" : "text-[#1A1A1A] dark:text-[#E0E0E0]"}`}
              >
                {size.value}
              </p>
              <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0] mt-0.5 leading-relaxed">
                {size.desc}
              </p>
              <p
                className={`text-xs font-semibold mt-1 ${value === size.value ? "text-[#D4AF37] dark:text-[#FFD700]" : "text-[#737373] dark:text-[#A0A0A0]"}`}
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
