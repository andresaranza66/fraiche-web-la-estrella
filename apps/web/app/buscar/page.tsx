import { Suspense } from "react";
import BuscarClient from "./BuscarClient";

export const dynamic = "force-dynamic";

export default function BuscarPage() {
  return (
    <Suspense
      fallback={
        <main>
          <div className="px-10 py-24">Cargando...</div>
        </main>
      }
    >
      <BuscarClient />
    </Suspense>
  );
}