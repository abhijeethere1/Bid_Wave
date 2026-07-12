import { User } from "lucide-react";

export default function AuctionMeta({ title, category, seller }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 bg-[#B22222] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          LIVE
        </span>
        <span className="text-[11px] text-[#737373] dark:text-[#A0A0A0] bg-[#FAF9F6] dark:bg-[#121212] border border-[#1A1A1A]/8 dark:border-[#E0E0E0]/8 px-2.5 py-1 rounded-full font-medium">
          {category}
        </span>
      </div>

      <h1 className="font-display text-2xl font-black text-[#1A1A1A] dark:text-[#E0E0E0] leading-snug">
        {title}
      </h1>

      <div className="flex items-center gap-2 mt-4">
        <div className="w-7 h-7 rounded-full bg-[#4B0082]/10 dark:bg-[#9D4EDD]/15 flex items-center justify-center">
          <User size={13} className="text-[#4B0082] dark:text-[#9D4EDD]" />
        </div>
        <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">
          Sold by{" "}
          <span className="text-[#1A1A1A] dark:text-[#E0E0E0] font-semibold">
            {seller}
          </span>
        </p>
      </div>
    </div>
  );
}
