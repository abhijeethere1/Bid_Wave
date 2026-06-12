import { Link } from "react-router-dom";

export default function DashboardHeader({
  title,
  subtitle,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="flex items-start justify-between pb-8 border-b border-gray-100 dark:border-gray-800">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </div>
      {actionLabel && (
        <Link
          to={actionTo}
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20 whitespace-nowrap"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
