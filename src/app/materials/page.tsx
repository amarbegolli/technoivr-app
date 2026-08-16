import { prisma } from "@/lib/prisma";

export default async function MaterialsPage() {
  const materials = await prisma.material.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Materials We Use
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We work exclusively with trusted, high-quality materials to ensure
          long-lasting results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((material) => (
          <div
        key={material.id}
        className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all bg-white"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-primary">
            {material.name}
          </h2>
          {material.brand && (
            <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
              {material.brand}
            </span>
          )}
        </div>
        {material.description && (
          <p className="text-gray-600">{material.description}</p>
        )}
      </div>
    ))}
      </div>
    </section>
  );
}