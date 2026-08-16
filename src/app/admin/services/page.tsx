import { prisma } from "@/lib/prisma";
import { addService, deleteService } from "@/actions/services";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Manage Services
      </h1>

      <form
        action={addService}
        className="border border-gray-200 rounded-xl p-6 mb-10 space-y-4"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-light transition"
        >
          Add Service
        </button>
      </form>

      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="border border-gray-200 rounded-xl p-5 flex items-start justify-between gap-4"
          >
            <div>
              <h2 className="font-semibold text-gray-900">{service.title}</h2>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
            <form action={deleteService.bind(null, service.id)}>
              <button
                type="submit"
                className="text-red-600 text-sm font-medium hover:underline shrink-0"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}