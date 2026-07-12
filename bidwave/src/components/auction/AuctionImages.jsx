import { useState } from "react";

export default function AuctionImages({ images = [], title }) {
  const [active, setActive] = useState(0);
  const displayImages =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&fit=crop",
        ];

  return (
    <div>
      <div
        className="rounded-2xl overflow-hidden bg-[#FAF9F6] dark:bg-[#121212] border border-[#4B0082]/8 dark:border-[#9D4EDD]/15"
        style={{ height: "320px" }}
      >
        <img
          src={displayImages[active]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {displayImages.length > 1 && (
        <div className="flex gap-2 mt-3">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-xl overflow-hidden border-2 transition-all shrink-0
                ${
                  active === i
                    ? "border-[#D4AF37] dark:border-[#FFD700]"
                    : "border-transparent opacity-40 hover:opacity-70"
                }`}
              style={{ width: 64, height: 64 }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
