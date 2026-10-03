import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gray-100 shadow-2xl">
            <Image
              src="/images/hero/batllavica-hidroizolim.jpg"
              alt="Projekt hidroizolim me membranë Bauder në Batllavë"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur px-5 py-4 shadow-lg border border-gray-100 flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">30</span>
            <div>
              <p className="font-semibold text-primary">Vite jetëgjatësi</p>
              <p className="text-sm text-gray-600">Membrana Bauder profesionale</p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 text-center lg:text-left pb-8 lg:pb-0">
          <p className="inline-flex items-center rounded-full bg-accent/10 text-accent px-4 py-1.5 text-sm font-semibold mb-5">
            HIDROIZOLIM PROFESIONAL
          </p>
          <h1 className="text-[1.9rem] leading-tight sm:text-4xl md:text-5xl font-bold text-[#0f2942] mb-5">
            Hidroizolim me membrana <span className="text-primary">Bauder</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
            Zgjidhje moderne për çati të sheshta, tarasa dhe pishina — me materiale
            Bauder dhe jetëgjatësi deri në <strong className="text-[#0f2942]">30 vite</strong>.
          </p>

          <ul className="space-y-3 text-left max-w-md mx-auto lg:mx-0 mb-8">
            {[
              "Membrana Bauder origjinale dhe certifikuara",
              "Hidroizolim profesional për çati, tarasa dhe pishina",
              "Jetëgjatësi deri në 30 vite me garanci",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-700">
                <span className="mt-1 w-5 h-5 rounded-full bg-accent/15 text-accent flex items-center justify-center text-xs" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <Link
              href="/contact"
              className="bg-accent text-white px-8 py-3.5 rounded-lg font-medium hover:bg-accent-dark transition text-center"
            >
              Na kontaktoni
            </Link>
            <Link
              href="/gallery"
              className="border-2 border-primary text-primary px-8 py-3.5 rounded-lg font-medium hover:bg-primary/5 transition text-center"
            >
              Shihni projektet →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
