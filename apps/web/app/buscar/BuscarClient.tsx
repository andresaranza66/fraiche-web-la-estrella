"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useQuery } from "convex/react";

import HeaderMain from "../_components/HeaderMain";
import { api } from "../convex/api";

export default function BuscarClient() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const normalizedQ = useMemo(() => q.trim(), [q]);

  const results = useQuery(api.perfumes.search, { q: normalizedQ });

  return (
    <main>
      <HeaderMain logoText="" showCatalogosLink={false} hideOnScrollDown />

      <section className="bg-[color:var(--color-neutral-100)] px-10 py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-6 mt-5">
            <h1 className="text-2xl font-bold text-[color:var(--color-neutral-900)] font-[family-name:var(--font-headline)]">
              Resultados
            </h1>

            <div className="mt-2 text-sm text-[color:var(--color-neutral-700)]">
              Buscando: <span className="font-semibold">{normalizedQ || "—"}</span>
            </div>
          </div>

          <div className="mt-6">
            {results === undefined ? (
              <div className="rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-6">
                Cargando...
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-6">
                No tenemos ese perfume.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((p) => (
                  <div
                    key={p._id}
                    className="rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-6"
                  >
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/catalogos/${p.slug}`}
                        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[color:var(--color-neutral-100)]"
                      >
                        <Image
                          src={`/images/${p.imageFileName ?? "queen.png"}`}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </Link>

                      <div className="min-w-0">
                        <Link
                          href={`/catalogos/${p.slug}`}
                          className="block truncate text-base font-semibold text-[color:var(--color-neutral-900)] font-[family-name:var(--font-headline)]"
                        >
                          {p.name}
                        </Link>

                        <div className="mt-1 text-xs text-[color:var(--color-neutral-700)]">
                          {p.gender}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={`${p._id}-${t}`}
                          className="rounded-full bg-[color:var(--color-neutral-100)] px-2 py-1 text-xs text-[color:var(--color-neutral-700)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}