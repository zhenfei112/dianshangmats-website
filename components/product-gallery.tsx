"use client";

import { useState } from "react";

export function ProductGallery({ name, images }: { name: string; images: string[] }) {
  const galleryImages = images.slice(0, 5);
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  return (
    <div>
      <div className="square-media rounded-3xl shadow-soft">
        <img src={activeImage} alt={name} />
      </div>
      <div className="mt-4 grid grid-cols-5 gap-3">
        {galleryImages.map((image, index) => (
          <button
            type="button"
            key={image}
            className={`square-media rounded-2xl border bg-white transition ${
              activeImage === image ? "border-leather-700 ring-2 ring-leather-700/20" : "border-transparent hover:border-[#dac8b7]"
            }`}
            onClick={() => setActiveImage(image)}
            aria-label={`View ${name} image ${index + 1}`}
          >
            <img src={image} alt={`${name} detail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
