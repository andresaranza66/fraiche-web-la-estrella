"use client"

import { useState, useMemo} from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/api";

import HeaderMain from "../../_components/HeaderMain";
import Image from "next/image";
import Link from "next/link";
import PerfumeGridSkeleton from "../../_components/PerfumeGridSkeleton";

const smellCategories = [
  { value: "citrico", label: "CÍTRICO" },
  { value: "dulce", label: "DULCE" },
  { value: "amaderado", label: "AMADERADO" },
  { value: "floral", label: "FLORAL" },
  { value: "oriental", label: "ORIENTAL" },
] as const;

type Perfume = {
  name: string;
  slug: string;
  gender: string;
  tags: string[];
  description?: string;
  inStock: boolean;
  sizesMl: number[];
  pricesByMl: Record<string, number>;
  imageFileName?: string;
};

export default function HombresPage ()  {
  const [selectedSmell, setSelectedSmell] = useState<string | null>(null);

  const perfumes = useQuery(api.perfumes.listByGender, { gender: "hombres" });
  const isLoading = perfumes === undefined;
  const allPerfumes = perfumes ?? [];
 

  const selectedLabel = useMemo(()=> {
    if(!selectedSmell) return "Todos";
    return smellCategories.find((c)=> c.value === selectedSmell)?.label ?? selectedSmell
  }, [selectedSmell])
  
const filteredPerfumes = useMemo(() => {
  if (!selectedSmell) return allPerfumes;
  return allPerfumes.filter((p) => p.tags.includes(selectedSmell));
}, [allPerfumes, selectedSmell]);

  

  if (isLoading) {
    return (
      <main>
        <HeaderMain logoText="" showCatalogosLink={false} hideOnScrollDown />
        <div className="px-10 py-24"><PerfumeGridSkeleton/></div>
      </main>
    );
  }
  return <main>
    <HeaderMain logoText="" showCatalogosLink={false} hideOnScrollDown />
    <section className="bg-[color:var(--color-neutral-100)] px-10 py-24">
       <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-10 rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-10 md:grid-cols-2 mt-5">
            <div className="flex max-w-[620px] flex-col items-start justify-center gap-6">
              <h3 className="text-xl font-semibold text-[color:var(--color-primary-800)] font-[family-name:var(--font-headline)]">
                Esencia Exclusiva para Ellos
              </h3>
              <h1 className="text-4xl font-bold text-[color:var(--color-primary-900)] font-[family-name:var(--font-headline)]">
                Colección Caballeros
              </h1>
              <h2 className="text-lg text-[color:var(--color-neutral-700)] font-[family-name:var(--font-headline)]">
                Descubre nuestra selección de fragancias que destacan la elegancia y sofisticación de los hombres.
              </h2>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative h-[260px] w-full max-w-[500px]">
                <Image
                  src="/images/strongBackground.png"
                  alt="Hombres"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="grid w-full max-w-[720px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
             

              {smellCategories.map((tag) => (
                <button
                  key={tag.value}
                  type="button"
                  onClick={() =>
                    setSelectedSmell((prev) => (prev === tag.value ? null : tag.value))
                  }
                  className={`rounded-lg px-4 py-3 text-m font-[family-name:var(--font-headline)] tracking-wide transition hover:cursor-pointer ${
                    selectedSmell === tag.value
                      ? "bg-[color:var(--color-primary-700)] text-white"
                      : "bg-[color:var(--color-neutral-200)] text-[color:var(--color-neutral-800)] hover:bg-[color:var(--color-neutral-300)]"
                  }`}
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

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPerfumes.map((p) => {
                const prices = Object.values(p.pricesByMl);
                const fromPrice = prices.length ? Math.min(...prices) : null;

                return (
                 
                  <div
                    key={p._id} 
                    className="rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-6 h-52"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[color:var(--color-neutral-100)]">
                         <Link href={`/catalogos/${p.slug}`}>
                        <Image
                          src={`/images/${p.imageFileName ?? "queen.png"}`}
                          alt={p.name}
                          fill
                          className=""
                        />
                        </Link>
                      </div>
                        
                      <div className="min-w-0">
                        <Link href={`/catalogos/${p.slug}`} >
                        <div className="truncate text-base font-semibold text-[color:var(--color-neutral-900)] font-[family-name:var(--font-headline)] p-3">
                          {p.name}
                        
                        </div>
                        </Link>
                        <div className="mt-1 flex flex-wrap gap-2 pt-4">
                          {p.tags.map((t) => (
                            <span
                              key={`${p.slug}-${t}`}
                              className="rounded-full bg-[color:var(--color-neutral-100)] px-2 py-1 text-xs text-[color:var(--color-neutral-700)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                       
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-6">
                      <div className="text-sm text-[color:var(--color-neutral-700)]">
                        {fromPrice !== null ? `Desde ${fromPrice.toLocaleString()}$` : "Sin precio"}
                      </div>
                      <Link href={`/catalogos/${p.slug}`}>

                      <div
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          p.inStock
                            ? "bg-[color:var(--color-primary-50)] text-[color:var(--color-primary-800)]"
                            : "bg-[color:var(--color-neutral-100)] text-[color:var(--color-neutral-700)]"
                        }`}
                      >
                        {p.inStock ? "Disponible" : "Agotado"}
                      </div>
                      </Link>
                    </div>
                  </div>
                 
                );
              })}
            </div>
          </div>
        </div>
    </section>
  </main>;
};

