import { useState } from "react";

export default function AuctionImages({ images = [], title }) {
  const [active, setActive] = useState(0);

  // Fallback if no images
  const displayImages =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&fit=crop",
        ];

  return (
    <div>
      {/* Main Image */}
      <div
        className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800"
        style={{ height: "320px" }}
      >
        <img
          src={displayImages[active]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails — only show if more than 1 image */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 mt-3">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-xl overflow-hidden border-2 transition-all shrink-0
                ${
                  active === i
                    ? "border-orange-500"
                    : "border-gray-200 dark:border-gray-700 opacity-50 hover:opacity-80"
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
