export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-b border-[#4B0082]/8 dark:border-[#9D4EDD]/10">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/8 dark:border-[#9D4EDD]/15 rounded-2xl p-5 shadow-[0_2px_12px_rgba(75,0,130,0.04)] dark:shadow-[0_2px_12px_rgba(157,78,221,0.04)]"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest font-medium">
              {stat.label}
            </p>
            {stat.icon && (
              <div className="w-8 h-8 bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 rounded-lg flex items-center justify-center text-[#4B0082] dark:text-[#9D4EDD]">
                {stat.icon}
              </div>
            )}
          </div>
          <p className="font-display text-2xl font-black text-[#D4AF37] dark:text-[#FFD700]">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
