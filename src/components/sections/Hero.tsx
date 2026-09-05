import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-14 sm:py-20 md:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 sm:mb-6">
          Hidroizolim & Termoizolim Profesional
        </h1>
          <div className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2>Techno IVR - Ku inovacioni takohet me zgjidhjen</h2> 
          <p>• Punime profesionale për çati të rrafshta dhe terasa</p> 
          <p>• Sisteme moderne për hidroizolim dhe termoizolim</p>
          <p>• Zgjidhje të plota për pishina dhe sipërfaqe të ekspozuara ndaj ujit</p>        
          </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/gallery"
            className="border border-primary text-primary px-8 py-3.5 rounded-lg font-medium hover:bg-primary/5 transition"
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
