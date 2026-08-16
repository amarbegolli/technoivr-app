import { prisma } from "@/lib/prisma";
import GalleryGrid from "@/components/sections/GalleryGrid";

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

      <GalleryGrid photos={photos} />
      {photos.length === 0 && (
        <p className="text-center text-gray-500">No photos yet.</p>
      )}
    </section>
  );
}