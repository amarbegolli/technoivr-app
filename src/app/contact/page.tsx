import { sendMessage } from "@/actions/sendMessage";
import { FaWhatsapp, FaViber, FaPhone, FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-10 sm:mb-14 bg-gradient-to-b from-blue-100 to-white -mx-4 px-4 pt-8 sm:pt-10 pb-6 rounded-b-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Na kontaktoni
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Na kontaktoni direkt, ose na dërgoni një mesazh dhe ne do t&apos;ju kontaktojmë.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16">
        <a href="tel:+38344474170" className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl p-3 sm:p-5 hover:shadow-lg hover:border-primary/30 hover:bg-primary/5 transition-all">
          <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <FaPhone size={18} />
          </span>
          <span className="text-sm font-medium text-gray-700">Phone</span>
        </a>
        <a href="https://wa.me/38344474170" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl p-3 sm:p-5 hover:shadow-lg hover:border-[#25D366]/30 hover:bg-[#25D366]/5 transition-all">
          <span className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
            <FaWhatsapp size={22} />
          </span>
          <span className="text-sm font-medium text-gray-700">WhatsApp</span>
        </a>
        <a href="viber://chat?number=%2B38344474170" className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl p-3 sm:p-5 hover:shadow-lg hover:border-[#7360F2]/30 hover:bg-[#7360F2]/5 transition-all">
          <span className="w-10 h-10 rounded-full bg-[#7360F2]/10 flex items-center justify-center text-[#7360F2]">
            <FaViber size={22} />
          </span>
          <span className="text-sm font-medium text-gray-700">Viber</span>
        </a>
        <a href="mailto:info@technoivr.com" className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl p-3 sm:p-5 hover:shadow-lg hover:border-accent/30 hover:bg-accent/5 transition-all">
          <span className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <FaEnvelope size={18} />
          </span>
          <span className="text-sm font-medium text-gray-700">Email</span>
        </a>
      </div>

      <form action={sendMessage} className="space-y-5 max-w-xl mx-auto">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Message *
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-light transition"        >
          Send Message
        </button>
      </form>
    </section>
  );
}
