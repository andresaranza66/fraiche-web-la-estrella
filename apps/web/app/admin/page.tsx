import { currentUser } from "@clerk/nextjs/server";
import AdminClient from "../_components/AdminClient";

export default async function AdminPage() {
  const user = await currentUser();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10">
      <div className="text-sm">
        <h1 className="font-bold text-lg border border-blue-500 rounded px-2 py-1">
          <span className="text-blue-500 border-[color:var(--color-neutral-200)]">User:</span> {user?.primaryEmailAddress?.emailAddress ?? "no user"}
        </h1>
      </div>
      <AdminClient />
    </main>
  );
}