export default function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          {label}
        </p>
        {icon && (
          <div className="w-8 h-8 bg-orange-50 dark:bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500">
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-black text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}
