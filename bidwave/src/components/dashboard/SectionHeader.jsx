export default function SectionHeader({ title, count }) {
  return (
    <div className="mt-8 mb-6 ml-2">
      <div className="flex items-center gap-3">
        <h2 className="text-base font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
          {title}
        </h2>
        {count !== undefined && (
          <span className="text-xs font-medium text-[#737373] dark:text-[#A0A0A0] bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 px-2.5 py-1 rounded-full">
            {count} total
          </span>
        )}
      </div>
    </div>
  );
}
