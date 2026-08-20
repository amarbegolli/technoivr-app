import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function AdminMessagesPage() {
  if (!(await isAdmin())) {
    redirect("/admin/access-denied");
  }

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Contact Messages
      </h1>

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
    </div>
  );
}
