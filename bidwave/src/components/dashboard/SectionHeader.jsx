export default function SectionHeader({ title, count }) {
  return (
    <div className="mt-8 mb-6 ml-2">
      <div className="flex items-center gap-3">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {count !== undefined && (
          <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
            {count} total
          </span>
        )}
      </div>
    </div>
  );
}
