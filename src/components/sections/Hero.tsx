import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Hidroizolim dhe Izolim Profesional
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Hidroizolim membrane PVC, izolim stiropori, instalim pllakash distancuese dhe përfundim zhavorri — i bërë siç duhet, i ndërtuar për cilësi dhe jetëgjatësi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-accent text-white px-8 py-3.5 rounded-lg font-medium hover:bg-accent-dark transition"
          >
            Na kontaktoni
          </Link>
          <Link
            href="/gallery"
            className="border border-primary text-primary px-8 py-3.5 rounded-lg font-medium hover:bg-primary/5 transition"
          >
            Njihuni me projektet tona
          </Link>
        </div>
      </div>
    </section>
  );
}