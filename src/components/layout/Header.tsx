"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { href: "/", label: "Ballina" },
    { href: "/services", label: "Shërbimet" },
    { href: "/gallery", label: "Galeria" },
    { href: "/materials", label: "Materialet" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 md:gap-3" onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/logo.png"
            alt="TechnoIVR Logo"
            width={64}
            height={64}
            className="w-11 h-11 md:w-16 md:h-16 object-contain"
          />
          <span className="font-bold text-lg md:text-xl text-gray-900">
            TechnoIVR
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-gray-700 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full transition">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden sm:inline-flex bg-primary text-white px-4 md:px-5 py-2.5 rounded-lg font-medium hover:bg-primary-light transition"
        >
          Na kontaktoni
        </Link>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={isMenuOpen ? "Mbyll menunë" : "Hap menunë"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="text-2xl leading-none" aria-hidden="true">☰</span>
        </button>
      </div>

      {/* Overlay - dark backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - slides from left */}
      <nav
        id="mobile-navigation"
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
          <span className="font-bold text-lg text-gray-900">Menu</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-primary hover:bg-primary/5"
            aria-label="Mbyll menunë"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-2xl leading-none" aria-hidden="true">×</span>
          </button>
        </div>

        <div className="grid gap-1 p-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-gray-700 font-medium hover:bg-primary/5 hover:text-primary transition"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 rounded-lg bg-primary px-4 py-3 text-center font-medium text-white hover:bg-primary-light transition"
          >
            Na kontaktoni
          </Link>
        </div>
      </nav>
    </header>
  );
}