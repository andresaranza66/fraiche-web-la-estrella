"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";


import HeaderMain from "../../_components/HeaderMain";
import { useCart } from "../../../lib/cart/cart-context";

// If you created apps/web/convex/api.ts:
import { api } from "../../convex/api";
// If you DID NOT create it, use this instead:
// import { api } from "../../../../convex/convex/_generated/api";

export default function PerfumeDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const router = useRouter();

  const perfume = useQuery(api.perfumes.getBySlug, { slug });


  const { addItem } = useCart();

  const sortedSizes = useMemo(() => {
    if (!perfume) return [];
    return [...perfume.sizesMl].sort((a, b) => a - b);
  }, [perfume]);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [extraPerfumeGrams, setExtraPerfumeGrams] = useState<number>(0);
  const [feromonasGrams, setFeromonasGrams] = useState<number>(0);
  const [justAdded, setJustAdded] = useState(false);
  const justAddedTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (justAddedTimeoutRef.current !== null) {
        window.clearTimeout(justAddedTimeoutRef.current);
      }
    };
  }, []);

  const baseUnitPrice = selectedSize ? perfume?.pricesByMl?.[String(selectedSize)] ?? null : null;
  const extrasUnitPrice = extraPerfumeGrams * 1100 + feromonasGrams * 1300;
  const unitPrice = baseUnitPrice !== null ? baseUnitPrice + extrasUnitPrice : null;

  if (perfume === undefined) {
    return (
      <main>
        <HeaderMain logoText="" showCatalogosLink={false} hideOnScrollDown />
        <div className="px-10 py-24">Cargando...</div>
      </main>
    );
  }

  if (perfume === null) {
    return (
      <main>
        <HeaderMain logoText="" showCatalogosLink={false} hideOnScrollDown />
        <button onClick={() => router.back()} className="px-10 py-24">Volver</button>
        <div className="px-10 py-24">No encontramos este perfume.</div>
      </main>
    );
  }

  return (
    <main>
      <HeaderMain logoText="" showCatalogosLink={false} hideOnScrollDown />

      <section className="bg-[color:var(--color-neutral-100)] px-10 py-24">
        
        <div className="mx-auto max-w-[900px] rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-8 mt-12">
            <button onClick={() => router.back()} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-800n shadow-sm ring-1 ring-neutral-200 transition-all duration-200 hover:bg-neutral-50 hover:shadow-md active:scale-95 cursor-pointer mb-4">
                <ArrowLeft size={18} /> Volver </button>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-[color:var(--color-neutral-100)] md:h-80 md:w-80">
              <Image
                src={`/images/${perfume.imageFileName ?? "queen.png"}`}
                alt={perfume.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[color:var(--color-neutral-900)] font-[family-name:var(--font-headline)]">
                {perfume.name}
              </h1>

             <div className="mt-3 flex flex-wrap gap-2">
                {perfume.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[color:var(--color-neutral-100)] px-3 py-1 text-sm font-semibold text-[color:var(--color-neutral-900)] font-[family-name:var(--font-headline)]"
                  >
                     {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                ))}
              </div>  

              {perfume.description ? (
                <p className="mt-4 text-sm text-[color:var(--color-neutral-700)]">{perfume.description}</p>
              ) : null}

              <div className="mt-6">
                <div className="text-sm font-semibold text-[color:var(--color-neutral-900)]">Tamaño</div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {sortedSizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`rounded-lg px-4 py-2 text-sm transition cursor-pointer ${
                        selectedSize === s
                          ? "bg-[color:var(--color-primary-700)] text-white"
                          : "bg-[color:var(--color-neutral-200)] text-[color:var(--color-neutral-800)] hover:bg-[color:var(--color-neutral-300)]"
                      }`}
                    >
                      {s}ml
                    </button>
                  ))}
                </div>
                

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-[color:var(--color-neutral-900)]">
                    <span className="font-semibold">Gramos extra (perfume)</span>
                    <select
                      value={extraPerfumeGrams}
                      onChange={(e) => setExtraPerfumeGrams(Number(e.target.value))}
                      className="h-10 rounded-lg border border-[color:var(--color-neutral-300)] bg-white px-3 text-sm outline-none"
                    >
                      {Array.from({ length: 11 }).map((_, i) => (
                        <option key={i} value={i}>
                          {i}g
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-2 text-sm text-[color:var(--color-neutral-900)]">
                    <span className="font-semibold">Gramos de feromonas</span>
                    <select
                      value={feromonasGrams}
                      onChange={(e) => setFeromonasGrams(Number(e.target.value))}
                      className="h-10 rounded-lg border border-[color:var(--color-neutral-300)] bg-white px-3 text-sm outline-none"
                    >
                      {Array.from({ length: 11 }).map((_, i) => (
                        <option key={i} value={i}>
                          {i}g
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mt-4 text-sm text-[color:var(--color-neutral-950)]">
                  {baseUnitPrice !== null
                    ? `Precio base: ${baseUnitPrice.toLocaleString("es-CO")}$`
                    : "Selecciona un tamaño para ver el precio"}
                </div>

                {baseUnitPrice !== null ? (
                  <div className="mt-2 text-sm text-[color:var(--color-neutral-700)]">
                    Extras: {extrasUnitPrice.toLocaleString("es-CO")}$
                  </div>
                ) : null}

                {unitPrice !== null ? (
                  <div className="mt-2 text-sm font-semibold text-[color:var(--color-neutral-900)]">
                    Total: {unitPrice.toLocaleString("es-CO")}$
                  </div>
                ) : null}

                <button
                  type="button"
                  disabled={!selectedSize}
                  onClick={() => {
                    if (!selectedSize) return;

                    const base = perfume.pricesByMl[String(selectedSize)];
                    if (typeof base !== "number") return;

                    const extras = extraPerfumeGrams * 1100 + feromonasGrams * 1300;
                    addItem({
                      productId: perfume._id,
                      slug: perfume.slug,
                      name: perfume.name,
                      sizeMl: selectedSize,
                      baseUnitPrice: base,
                      unitPrice: base + extras,
                      extraPerfumeGrams,
                      feromonasGrams,
                    });

                    setJustAdded(true);
                    if (justAddedTimeoutRef.current !== null) {
                      window.clearTimeout(justAddedTimeoutRef.current);
                    }
                    justAddedTimeoutRef.current = window.setTimeout(() => {
                      setJustAdded(false);
                    }, 1200);
                  }}
                  className="mt-6 w-full rounded-xl bg-[color:var(--color-primary-700)] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer hover:opacity-90 transition"
                >
                  {justAdded ? "Agregado" : "Agregar Al Carrito"}
                </button>

                <div
                  className={`mt-2 text-sm text-[color:var(--color-neutral-700)] transition-opacity ${
                    justAdded ? "opacity-100" : "opacity-0"
                  }`}
                  aria-live="polite"
                >
                  Agregado al carrito.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}