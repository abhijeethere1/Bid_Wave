import { User } from "lucide-react";

export default function AuctionMeta({ title, category, seller }) {
  return (
    <div>
      {/* Badges */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          LIVE
        </span>
        <span className="text-[11px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full font-medium">
          {category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-black text-gray-900 dark:text-white leading-snug">
        {title}
      </h1>

      {/* Seller */}
      <div className="flex items-center gap-2 mt-3">
        <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">
          <User size={13} className="text-orange-500" />
        </div>
        <p className="text-sm text-gray-400">
          Sold by{" "}
          <span className="text-gray-900 dark:text-white font-semibold">
            {seller}
          </span>
        </p>
      </div>
    </div>
  );
}
