import { sendMessage } from "@/actions/sendMessage";

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Reach out directly, or send us a message and we&apos;ll get back to yoxu.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <a href="tel:+38344474170" className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
          <span className="text-2xl">Call</span>
          <span className="text-sm font-medium text-gray-700">Phone</span>
        </a>
        <a href="https://wa.me/38344474170" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
          <span className="text-2xl">Chat</span>
          <span className="text-sm font-medium text-gray-700">WhatsApp</span>
        </a>
        <a href="viber://chat?number=%2B38344474170" className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
          <span className="text-2xl">Chat</span>
          <span className="text-sm font-medium text-gray-700">Viber</span>
        </a>
        <a href="mailto:info@technoivr.com" className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
          <span className="text-2xl">Mail</span>
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
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}