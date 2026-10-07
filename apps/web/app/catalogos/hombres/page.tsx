import HeaderMain from "../../_components/HeaderMain";
import Image from "next/image";
import CatalogoGrid from "../../_components/CatalogoGrid";

export default function HombresPage() {
  return (
    <main>
      
      <section className="bg-[color:var(--color-neutral-100)] px-10 py-24">
        <div className="mx-auto max-w-[1200px]">
          {/* Static hero — renders instantly on the server */}
          <div className="grid grid-cols-1 gap-10 rounded-2xl border border-[color:var(--color-neutral-200)] bg-[color:var(--color-neutral-50)] p-10 md:grid-cols-2 mt-5">
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
                <Image src="/images/strongBackground.png" alt="Hombres" fill className="object-contain" priority />
              </div>
            </div>
          </div>

          {/* Interactive, DB-backed part — streams in with its own skeleton */}
          <CatalogoGrid gender="hombres" emptyLabel="Todos" />
        </div>
      </section>
    </main>
  );
}