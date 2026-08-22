import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  if (!(await isAdmin())) {
    redirect("/admin/access-denied");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <UserButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/messages"
          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all bg-white"
        >
          <div className="w-8 h-1 bg-accent rounded-full mb-3" />
          <h2 className="font-semibold text-primary mb-1">Mesazhet</h2>
          <p className="text-sm text-gray-600">Shiko mesazhet e dërguara nga klientët.</p>
        </Link>

        <Link
          href="/admin/photos"
          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all bg-white"
        >
          <div className="w-8 h-1 bg-accent rounded-full mb-3" />
          <h2 className="font-semibold text-primary mb-1">Fotot</h2>
          <p className="text-sm text-gray-600">Menaxhimi i fotove.</p>
        </Link>

        <Link
          href="/admin/services"
          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all bg-white"
        >
          <div className="w-8 h-1 bg-accent rounded-full mb-3" />
          <h2 className="font-semibold text-primary mb-1">Shërbimet</h2>
          <p className="text-sm text-gray-600">Menaxhimi dhe kontrolli i shërbimeve të ofruara.</p>
        </Link>

        <Link
          href="/admin/materials"
          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all bg-white"
        >
          <div className="w-8 h-1 bg-accent rounded-full mb-3" />
          <h2 className="font-semibold text-primary mb-1">Materialet</h2>
          <p className="text-sm text-gray-600">Menaxhimi i materialeve të përdorura nga ne.</p>
        </Link>
      </div>
    </div>
  );
}
