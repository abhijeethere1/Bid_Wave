import { useState } from "react";

export default function AuctionImages({ image, title }) {
  const [active, setActive] = useState(0);
  const images = [image, image, image];

  return (
    <div>
      {/* Main Image */}
      <div
        className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800"
        style={{ height: "320px" }}
      >
        <img
          src={images[active]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-xl overflow-hidden border-2 transition-all shrink-0
              ${active === i ? "border-orange-500" : "border-gray-200 dark:border-gray-700 opacity-50 hover:opacity-80"}`}
            style={{ width: 64, height: 64 }}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
