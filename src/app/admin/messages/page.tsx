import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";
import { getPageNumber } from "@/lib/pagination";
import Link from "next/link";
import { redirect } from "next/navigation";

const PAGE_SIZE = 10;

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  if (!(await isAdmin())) {
    redirect("/admin/access-denied");
  }

  const params = await searchParams;
  const requestedPage = getPageNumber(params.page);
  const totalCount = await prisma.message.count();
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  const messages = await prisma.message.findMany({
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-sm text-gray-500">{totalCount} total messages</p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="border border-gray-200 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-gray-900">{message.name}</h2>
              <span className="text-xs text-gray-500">
                {message.createdAt.toLocaleDateString()}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-3 space-x-3">
              {message.phone && <span>📞 {message.phone}</span>}
              {message.email && <span>✉️ {message.email}</span>}
            </div>
            <p className="text-gray-700">{message.content}</p>
          </div>
        ))}

        {messages.length === 0 && (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Message pages" className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {currentPage > 1 && (
            <Link
              href={`/admin/messages?page=${currentPage - 1}`}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Previous
            </Link>
          )}
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={`/admin/messages?page=${currentPage + 1}`}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Next
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
