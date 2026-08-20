import { prisma } from "@/lib/prisma";
import GalleryGrid from "@/components/sections/GalleryGrid";
import Link from "next/link";

export const revalidate = 300;

const PAGE_SIZE = 9;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10));

  const [photos, totalCount] = await Promise.all([
    prisma.photo.findMany({
      orderBy: { order: "asc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.photo.count(),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-10 sm:mb-14 bg-gradient-to-b from-blue-100 to-white -mx-4 px-4 pt-8 sm:pt-10 pb-6 rounded-b-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Projektet e realizuara
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
        Një vështrim mbi projektet tona të përfunduara të hidroizolimit dhe izolimit.</p>
      </div>

      <GalleryGrid photos={photos} />

      {photos.length === 0 && (
        <p className="text-center text-gray-500">No photos yet.</p>
      )}

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-10 sm:mt-12">
          {currentPage > 1 && (
            <Link
              href={`/gallery?page=${currentPage - 1}`}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Previous
            </Link>
          )}

          <span className="text-sm text-gray-600 px-4">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages && (
            <Link
              href={`/gallery?page=${currentPage + 1}`}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
