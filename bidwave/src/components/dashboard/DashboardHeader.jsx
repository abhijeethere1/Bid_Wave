import { Link } from "react-router-dom";

export default function DashboardHeader({
  title,
  subtitle,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="flex items-start justify-between pb-8 border-b border-[#4B0082]/8 dark:border-[#9D4EDD]/10">
      <div>
        <h1 className="font-display text-2xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
          {title}
        </h1>
        <p className="text-sm text-[#737373] dark:text-[#A0A0A0] mt-1">
          {subtitle}
        </p>
      </div>
      {actionLabel && (
        <Link
          to={actionTo}
          className="px-5 py-2.5 bg-[#D4AF37] dark:bg-[#FFD700] hover:brightness-110 text-[#1A1A1A] text-sm font-bold rounded-xl transition-all shadow-[0_4px_16px_rgba(212,175,55,0.25)] whitespace-nowrap"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
