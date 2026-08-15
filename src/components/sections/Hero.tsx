import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Professional Waterproofing &amp; Insulation
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          PVC membrane waterproofing, styrofoam insulation, spacer tile
          installation, and gravel finishing — done right, built to last.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Contact Us
          </Link>
          <Link
            href="/gallery"
            className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}