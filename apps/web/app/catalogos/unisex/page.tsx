import HeaderMain from "../../_components/HeaderMain";
import Image from "next/image";
import CatalogoGrid from "../../_components/CatalogoGrid";

export default function UnisexPage() {
  return (
    <main>
      
      <section className="bg-orange-50 px-10 py-24">
        <div className="mx-auto max-w-[1200px]">
          {/* Static hero — renders instantly on the server */}
          <div className="grid grid-cols-1 gap-10 rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-10 md:grid-cols-2 mt-5">
            <div className="flex max-w-[620px] flex-col items-start justify-center gap-6">
              <h3 className="text-xl font-semibold text-[color:var(--color-primary-800)] font-[family-name:var(--font-headline)]">
                Esencia Exclusiva para Todos
              </h3>
              <h1 className="text-4xl font-bold text-[color:var(--color-primary-900)] font-[family-name:var(--font-headline)]">
                Colección Unisex
              </h1>
              <h2 className="text-lg text-[color:var(--color-neutral-700)] font-[family-name:var(--font-headline)]">
                Descubre nuestra selección de fragancias que destacan la elegancia y sofisticación de todos, Aqui encontraras las mejores fragancias sin etiquetas si es para el o para ellas, Aqui es para Todos.
              </h2>
            </div>
            <div className="flex items-center justify-center rounded-2xl p-5 gap-5">
              <div className="relative h-[260px] w-full max-w-[250px]">
                <Image src="/images/solei.png" alt="Unisex" fill className="object-contain" priority />
              </div>
            </div>
          </div>

          {/* Interactive, DB-backed part — streams in with its own skeleton */}
          <CatalogoGrid gender="unisex" emptyLabel="Todos" />
        </div>
      </section>
    </main>
  );
}