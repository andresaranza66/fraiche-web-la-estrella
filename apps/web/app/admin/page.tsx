export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10">
      <h1 className="font-[family-name:var(--font-headline)] text-2xl">Admin</h1>
      <p className="mt-2 font-[family-name:var(--font-body)] text-[color:var(--color-neutral-700)]">
        This route will be protected with Convex Auth. Next step: wire login + restrict to admins.
      </p>
    </main>
  );
}
