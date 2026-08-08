"use client";

import { memo, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import type { FunctionReturnType } from "convex/server";
import { api } from "../convex/api";
import PerfumeGridSkeleton from "./PerfumeGridSkeleton";
import type { FunctionArgs } from "convex/server";

const smellCategories = [
  { value: "citrico", label: "CÍTRICO" },
  { value: "dulce", label: "DULCE" },
  { value: "amaderado", label: "AMADERADO" },
  { value: "floral", label: "FLORAL" },
  { value: "oriental", label: "ORIENTAL" },
] as const;

type Perfume = FunctionReturnType<typeof api.perfumes.listByGender>[number];
type PerfumeWithPrice = Perfume & { fromPrice: number | null };

const PerfumeCard = memo(function PerfumeCard({ perfume }: { perfume: PerfumeWithPrice }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[color:var(--color-neutral-100)]">
          <Link href={`/catalogos/${perfume.slug}`}>
            <Image src={`/images/${perfume.imageFileName || "queen.png"}`} alt={perfume.name} fill className="" />
          </Link>
        </div>
        <div className="min-w-0">
          <Link href={`/catalogos/${perfume.slug}`}>
            <div className="truncate text-base font-semibold text-[color:var(--color-neutral-900)] font-[family-name:var(--font-headline)] p-3">
              {perfume.name}
            </div>
          </Link>
          <div className="mt-1 flex flex-wrap gap-2 pt-4">
            {perfume.tags.map((t) => (
              <span key={`${perfume.slug}-${t}`} className="rounded-full bg-[color:var(--color-neutral-100)] px-2 py-1 text-xs text-[color:var(--color-neutral-700)]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between pt-6">
        <div className="text-sm text-[color:var(--color-neutral-700)]">
          {perfume.fromPrice !== null ? `Desde ${perfume.fromPrice.toLocaleString()}$` : "Sin precio"}
        </div>
        <Link href={`/catalogos/${perfume.slug}`}>
          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${perfume.inStock ? "bg-[color:var(--color-primary-50)] text-[color:var(--color-primary-800)]" : "bg-[color:var(--color-neutral-100)] text-[color:var(--color-neutral-700)]"}`}>
            {perfume.inStock ? "Disponible" : "Agotado"}
          </div>
        </Link>
      </div>
    </div>
  );
});


type Gender = FunctionArgs<typeof api.perfumes.listByGender>["gender"];

type CatalogoGridProps = {
  gender: Gender;
  emptyLabel?: string;
};

export default function CatalogoGrid({ gender, emptyLabel = "Todas" }: CatalogoGridProps) {
  const [selectedSmell, setSelectedSmell] = useState<string | null>(null);
  const perfumes = useQuery(api.perfumes.listByGender, { gender });
  const isLoading = perfumes === undefined;

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

        {isLoading ? (
          <PerfumeGridSkeleton />
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPerfumes.map((p) => (
              <PerfumeCard key={p.slug} perfume={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}