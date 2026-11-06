import { currentUser } from "@clerk/nextjs/server";
import AdminClient from "../_components/AdminClient";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AdminPage() {
  const user = await currentUser();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 py-6 mt-4 ">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors border-transparent hover:border-purple-500 hover:bg-white border border-rounded px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Perfume Admin Panel</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your fragrance catalog</p>
            </div>
            <div className="rounded-full bg-purple-100 px-4 py-2">
              <p className="text-xs font-semibold text-purple-700">Admin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 rounded-lg border border-purple-100 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Logged in as</p>
          <p className="mt-2 font-semibold text-gray-900">
            {user?.primaryEmailAddress?.emailAddress ?? "no user"}
          </p>
        </div>
        <AdminClient />
      </div>
    </main>
  );
}