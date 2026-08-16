import { prisma } from "@/lib/prisma";

export default async function GalleryPage() {
  const photos = await prisma.photo.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-14 bg-gradient-to-b from-blue-100 to-white -mx-4 px-4 pt-10 pb-6 rounded-b-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Work
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A look at our completed waterproofing and insulation projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition"
          >
            <img
              src={photo.url}
              alt={photo.caption ?? "Project photo"}
              className="w-full h-64 object-cover"
            />
            {photo.caption && (
              <div className="p-4">
                <p className="text-gray-700 text-sm">{photo.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <p className="text-center text-gray-500">No photos yet.</p>
      )}
    </section>
  );
}