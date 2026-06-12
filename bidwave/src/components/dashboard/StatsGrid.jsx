export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-b border-gray-100 dark:border-gray-800">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
              {stat.label}
            </p>
            {stat.icon && (
              <div className="w-8 h-8 bg-orange-50 dark:bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500">
                {stat.icon}
              </div>
            )}
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
