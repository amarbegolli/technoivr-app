"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  {
    key: "hidroizolim",
    image: "/images/work/Hidroizolimi.webp",
    title: "Hidroizolim me membranë PVC",
    description:
      "Zgjidhje profesionale hidroizoluese për çati, tarraca dhe struktura, me membranë PVC cilësore.",
  },
  {
    key: "termoizolimi",
    image: "/images/work/Termoizolimi.webp",
    title: "Termoizolim me PIR Bauder",
    description:
      "Izolim termik efikas që redukton humbjen e nxehtësisë dhe uljen e kostove të energjisë.",
  },
  {
    key: "pishina",
    image: "/images/work/Pishina.webp",
    title: "Pishina",
    description:
      "Finalizim profesional i Pishinës, me pamje estetike dhe cilësi afatgjatë.",
  },
];

export default function ProjectsShowcase() {
  const [openImage, setOpenImage] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2942] mb-12 text-center">
          Projektet Tona
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setOpenImage(cat.image)}
              className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-[#e8730a]/70 transition-opacity duration-300 group-hover:opacity-0"
                  style={{ clipPath: "polygon(0 0, 60% 0, 30% 100%, 0 100%)" }}
                />
                <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition-transform duration-300 group-hover:rotate-45">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f2942" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0f2942] mb-2">{cat.title}</h3>
                <p className="text-gray-600 text-sm">{cat.description}</p>
                <div className="mt-4 h-0.5 w-8 bg-[#e8730a] transition-all duration-300 group-hover:w-16" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {openImage && (
        <div
          onClick={() => setOpenImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        >
          <button
            onClick={() => setOpenImage(null)}
            className="absolute top-6 right-6 text-white text-4xl leading-none hover:text-[#e8730a] transition-colors"
            aria-label="Mbyll"
          >
            ×
          </button>
          <div className="relative h-[80vh] w-full max-w-4xl">
            <Image
              src={openImage}
              alt="Foto e zmadhuar"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}