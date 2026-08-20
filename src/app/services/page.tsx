import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const revalidate = 3600;

const PAGE_SIZE = 6;

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10));

  const [services, totalCount] = await Promise.all([
    prisma.service.findMany({
      orderBy: { order: "asc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.service.count(),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-10 sm:mb-14 bg-gradient-to-b from-blue-100 to-white -mx-4 px-4 pt-8 sm:pt-10 pb-6 rounded-b-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Sherbimet e ofruara
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Zgjidhje të plota hidroizolim, termoizolim dhe riparimi nga instalimi i membranës deri në përfundimin përfundimtar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="border border-gray-200 rounded-xl p-5 sm:p-6 hover:shadow-lg hover:border-primary/30 transition-all bg-white"
          >
            <div className="w-10 h-1 bg-accent rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-primary mb-2">
              {service.title}
            </h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-10 sm:mt-12">
          {currentPage > 1 && (
            <Link
              href={`/services?page=${currentPage - 1}`}
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
              href={`/services?page=${currentPage + 1}`}
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
