import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">TechnoIVR</h3>
          <div className="text-sm leading-relaxed">
            <p>Techno IVR - Ku inovacioni takohet me zgjidhjen</p>
            <p>• Punime profesionale për çati të rrafshta dhe terasa</p> 
            <p>•	Sisteme moderne për hidroizolim dhe termoizolim</p>
             <p>•	Zgjidhje të plota për pishina dhe sipërfaqe të ekspozuara ndaj ujit</p></div>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-white transition">Shërbimet</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition">Galeria</Link></li>
            <li><Link href="/materials" className="hover:text-white transition">Materialet</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Kontakti</Link></li>
          </ul>
        </div>
 
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone className="text-primary-light" size={14} />
              +383 44 474 170
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-primary-light" size={14} />
              technoivr9@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-light" size={14} />
              Prishtina, Kosovo
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center text-sm text-gray-500">
        <span>© {new Date().getFullYear()} TechnoIVR. All rights reserved.</span>
        <Link href="/admin" className="text-gray-600 hover:text-gray-400 transition">
          Login
        </Link>
      </div>
    </footer>
  );
}