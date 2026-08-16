import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-14 bg-gradient-to-b from-blue-100 to-white -mx-4 px-4 pt-10 pb-6 rounded-b-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete waterproofing and insulation solutions, from membrane
          installation to final finishing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
        key={service.id}
        className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all bg-white"
      >
        <div className="w-10 h-1 bg-accent rounded-full mb-4" />
        <h2 className="text-xl font-semibold text-primary mb-2">
          {service.title}
        </h2>
        <p className="text-gray-600">{service.description}</p>
      </div>
        ))}
      </div>
    </section>
  );
}