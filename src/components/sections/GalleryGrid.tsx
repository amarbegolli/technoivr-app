"use client";

import { useState } from "react";
import Image from "next/image";

type Photo = {
  id: string;
  url: string;
  category: string;
  caption: string | null;
};

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<Photo | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelected(photo)}
            className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all group cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={photo.url}
                alt={photo.caption ?? "Project photo"}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              <span className="absolute top-3 left-3 bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                {photo.category.replace("_", " ")}
              </span>
            </div>
            {photo.caption && (
              <div className="p-4">
                <p className="text-gray-700 text-sm">{photo.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-4 cursor-pointer"
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 w-11 h-11 text-white text-3xl font-light hover:opacity-70"
          >
            ✕
          </button>
            <Image
            src={selected.url}
            alt={selected.caption ?? "Project photo"}
            width={1200}
            height={800}
            className="max-w-full max-h-[80vh] sm:max-h-[85vh] w-auto h-auto object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
            />
          {selected.caption && (
            <p className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-auto text-center text-white text-sm bg-black/50 px-4 py-2 rounded-lg">
              {selected.caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
