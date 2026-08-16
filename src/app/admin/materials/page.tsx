import { prisma } from "@/lib/prisma";
import { addMaterial, deleteMaterial } from "@/actions/materials";

export default async function AdminMaterialsPage() {
  const materials = await prisma.material.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Manage Materials
      </h1>

      <form
        action={addMaterial}
        className="border border-gray-200 rounded-xl p-6 mb-10 space-y-4 bg-gray-50/50"      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-light transition"
        >
          Add Material
        </button>
      </form>

      <div className="space-y-3">
        {materials.map((material) => (
          <div
            key={material.id}
            className="border border-gray-200 rounded-xl p-5 flex items-start justify-between gap-4"
          >
            <div>
              <h2 className="font-semibold text-gray-900">
                {material.name}
                {material.brand && (
                  <span className="text-accent ml-2 text-sm">
                    ({material.brand})
                  </span>
                )}
              </h2>
              {material.description && (
                <p className="text-sm text-gray-600">{material.description}</p>
              )}
            </div>
            <form action={deleteMaterial.bind(null, material.id)}>
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