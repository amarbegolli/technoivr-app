import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://dtudrytofqumvriswekz.supabase.co/storage/v1/object/public/photos/hero-background.jpg"
          alt="Hidroizolim me membranë PVC"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/85 via-primary-dark/75 to-primary-dark/90" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-28 md:py-32 text-center">
        <h1 className="text-[1.75rem] max-sm:leading-tight max-sm:text-balance sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
          Hidroizolim & Termoizolim Profesional
        </h1>
        <div className="text-base sm:text-lg text-gray-100 max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="font-medium mb-4 sm:mb-2 max-sm:text-balance">Techno IVR - Ku inovacioni takohet me zgjidhjen</p>
          <ul className="space-y-3 text-left sm:space-y-0 sm:text-center">
            <li className="flex items-start gap-2 sm:block">
              <span aria-hidden="true" className="shrink-0">•</span>{" "}
              <span>Punime profesionale për çati të rrafshta dhe terasa</span>
            </li>
            <li className="flex items-start gap-2 sm:block">
              <span aria-hidden="true" className="shrink-0">•</span>{" "}
              <span>Sisteme moderne për hidroizolim dhe termoizolim</span>
            </li>
            <li className="flex items-start gap-2 sm:block">
              <span aria-hidden="true" className="shrink-0">•</span>{" "}
              <span>Zgjidhje të plota për pishina dhe sipërfaqe të ekspozuara ndaj ujit</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/gallery"
            className="border-2 border-white text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white/10 transition"
          >
            Shihni projektet tona →
          </Link>
          <Link
            href="/contact"
            className="bg-accent text-white px-8 py-3.5 rounded-lg font-medium hover:bg-accent-dark transition"
          >
            Na kontaktoni
          </Link>
        </div>
      </div>
    </section>
  );
}
