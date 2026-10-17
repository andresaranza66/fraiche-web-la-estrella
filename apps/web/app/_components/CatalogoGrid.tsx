"use client";

import { memo, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePreloadedQuery } from "convex/react";
import type { Preloaded } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { api } from "../convex/api";

const smellCategories = [
  { value: "citrico", label: "CÍTRICO" },
  { value: "dulce", label: "DULCE" },
  { value: "amaderado", label: "AMADERADO" },
  { value: "floral", label: "FLORAL" },
  { value: "oriental", label: "ORIENTAL" },
] as const;

type Perfume = FunctionReturnType<typeof api.perfumes.listByGender>[number];
type PerfumeWithPrice = Perfume & { fromPrice: number | null };

 const PerfumeCard = memo(function PerfumeCard({
  perfume,
}: {
  perfume: PerfumeWithPrice;
}) {
  return (

    <div className="flex h-full items-center rounded-2xl border border-[color:var(--color-neutral-200)] p-4 sm:gap-6 sm:p-6">
      <Link
        href={`/catalogos/${perfume.slug}`}
        className="relative block h-40 w-28 shrink-0 overflow-hidden rounded-xl bg-[color:var(--color-neutral-100)] sm:h-48 sm:w-36"
      >
        <Image
          src={perfume.imageUrl || `/images/${perfume.imageFileName || "queen.png"}`}
          alt={perfume.name}
          fill
          sizes="(min-width: 640px) 144px, 112px"
          className="object-cover"
        />
      </Link>

      <div className=" ml-auto min-w-0 flex-1 text-right">
        <Link
          href={`/catalogos/${perfume.slug}`}
          className="block break-words text-lg font-semibold leading-snug text-[color:var(--color-neutral-900)] font-[family-name:var(--font-headline)]"
        >
          {perfume.name}
        </Link>

        <div className="mt-3 flex flex-wrap justify-end gap-2">
          {perfume.tags.map((t) => (
            <span
              key={`${perfume._id}-${t}`}
              className="rounded-full bg-[color:var(--color-neutral-100)] px-2 py-1 text-xs text-[color:var(--color-neutral-700)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap justify-end items-center gap-x-4 gap-y-2">
          <p className="text-sm text-[color:var(--color-neutral-700)]">
            {perfume.fromPrice !== null
              ? `Desde ${perfume.fromPrice.toLocaleString()}$`
              : "Sin precio"}
          </p>

          <Link
            href={`/catalogos/${perfume.slug}`}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              perfume.inStock
                ? "bg-[color:var(--color-primary-200)] text-[color:var(--color-primary-800)]"
                : "bg-[color:var(--color-neutral-100)] text-[color:var(--color-neutral-700)]"
            }`}
          >
            {perfume.inStock ? "Disponible" : "Agotado"}
          </Link>
        </div>
      </div>
    </div>
  );
});


type CatalogoGridProps = {
  preloadedPerfumes: Preloaded<typeof api.perfumes.listByGender>;
  emptyLabel?: string;
};

export default function CatalogoGrid({
  preloadedPerfumes,
  emptyLabel = "Todas",
}: CatalogoGridProps) {
  const [selectedSmell, setSelectedSmell] = useState<string | null>(null);
  const perfumes = usePreloadedQuery(preloadedPerfumes);

  const selectedLabel = useMemo(() => {
    if (!selectedSmell) return emptyLabel;
    return smellCategories.find((c) => c.value === selectedSmell)?.label ?? selectedSmell;
  }, [selectedSmell, emptyLabel]);

  const filteredPerfumes = useMemo<PerfumeWithPrice[]>(() => {
    const list = perfumes ?? [];
    const base = selectedSmell ? list.filter((p) => p.tags.includes(selectedSmell)) : list;
    return base.map((p) => {
      const prices = Object.values(p.pricesByMl);
      return { ...p, fromPrice: prices.length ? Math.min(...prices) : null };
    });
  }, [perfumes, selectedSmell]);

  return (
    <>
      <div className="mt-10 flex justify-center">
        <div className="grid w-full max-w-[720px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {smellCategories.map((tag) => (
            <button
              key={tag.value}
              type="button"
              onClick={() => setSelectedSmell((prev) => (prev === tag.value ? null : tag.value))}
              className={`rounded-lg px-4 py-3 text-m font-[family-name:var(--font-headline)] tracking-wide transition hover:cursor-pointer ${selectedSmell === tag.value ? "bg-[color:var(--color-primary-700)] text-white" : "bg-[color:var(--color-neutral-200)] text-[color:var(--color-neutral-800)] hover:bg-[color:var(--color-neutral-300)]"}`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

           <div className="mt-10">
        <div className="text-center text-sm text-[color:var(--color-neutral-700)] font-[family-name:var(--font-headline)]">
          Filtro activo: <span className="font-semibold">{selectedLabel}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredPerfumes.map((p) => (
            <PerfumeCard key={p._id} perfume={p} />
          ))}
        </div>
      </div>
    </>
  );
}