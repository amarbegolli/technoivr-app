import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <UserButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/messages"
          className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
        >
          <h2 className="font-semibold text-gray-900 mb-1">Messages</h2>
          <p className="text-sm text-gray-600">View contact form submissions</p>
        </Link>

        <Link
          href="/admin/photos"
          className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
        >
          <h2 className="font-semibold text-gray-900 mb-1">Photos</h2>
          <p className="text-sm text-gray-600">Manage gallery photos</p>
        </Link>
      </div>
    </div>
  );
}