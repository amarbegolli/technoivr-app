import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="TechnoIVR Logo"
            width={64}
            height={64}
            className="object-contain"
          />
          <span className="font-bold text-xl text-gray-900">
            TechnoIVR
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-primary transition">
            Home
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-primary transition">
            Services
          </Link>
          <Link href="/gallery" className="text-gray-700 hover:text-primary transition">
            Gallery
          </Link>
          <Link href="/materials" className="text-gray-700 hover:text-primary transition">
            Materials
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-primary transition">
            Contact
          </Link>
        </nav>

        <Link
          href="/contact"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}