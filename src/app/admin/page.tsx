import { UserButton } from "@clerk/nextjs";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <UserButton />
      </div>
      <p className="text-gray-600">Welcome to the admin panel.</p>
    </div>
  );
}