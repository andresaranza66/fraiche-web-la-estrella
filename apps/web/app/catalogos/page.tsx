import HeaderMain from "../_components/HeaderMain";
import Image from "next/image";
import Link from "next/link";
import Footer from "../_components/Footer";

export default function CatalogosPage() {
  return (
    <>
      <HeaderMain logoText="" showCatalogosLink={false} hideOnScrollDown />
      <main className="px-6  pt-28 lg:px-12 bg-[color:var(--color-neutral-100)]">
        <section className="mx-auto max-w-6xl py-24">
          <div className="flex justify-center pb-24">
            <div className="flex w-full max-w-2xl flex-col items-center gap-2 text-center">
              <h3 className="font-semibold text-[color:var(--color-primary-800)]">
                Catalogos exclusivos
              </h3>
              <h1 className="text-3xl tracking-wide">NUESTRA COLECCIONES</h1>
              <h2 className="text-sm text-[color:var(--color-neutral-700)]">
                Encuentra las mejores ezencias para ti o para los que mas quieres, que mejor regalo que el un aroma que transmita tus sentimientos, recuerdos o simplemente para hacerte sentir especial.
              </h2>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[1.35fr_0.9fr] h-[550px]">
            <Link
              href="/catalogos/unisex"
              className="group relative overflow-hidden rounded-2xl bg-[#071a2a] p-8 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              <Image
                src="/images/strong.png"
                alt="Colección de Unisex"
                fill
                className="pointer-events-none opacity-80 transition duration-500 group-hover:scale-[1.02]"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/25 to-black/45" />

              <div className="relative z-10 flex min-h-[420px] flex-col justify-end">
                <div className="inline-flex w-fit rounded-full border border-white/25 bg-white/40 px-3 py-1 text-[10px] font-medium tracking-[0.22em]">
                  MASCULINO
                </div>

                <h3 className="mt-5 font-[family-name:var(--font-headline)] text-4xl leading-[1.05] text-[color:var(--color-neutral-100)]">
                  Colección de
                  <br />
                  Hombres
                </h3>

                <p className="mt-3 max-w-md text-sm text-white/80">
                  Sofisticación y Poder. Una amalgama de maderas nobles y notas de cuero para el carácter decidido.
                </p>

                <div className="mt-7">
                  <span className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-xs font-semibold tracking-wide text-[color:var(--color-neutral-900)]">
                    VER CATÁLOGO
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/catalogos/damas"
              className="group relative overflow-hidden rounded-2xl bg-[#7e1a3c] p-8 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10"
            >
              <Image
                src="/images/dreamer.png"
                alt="Colección de Mujeres"
                fill
                className="pointer-events-none opacity-95 transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/40" />

              <div className="relative z-10 flex min-h-[420px] flex-col justify-end">
                <div className="inline-flex w-fit rounded-full border border-white/25 bg-white/40 px-3 py-1 text-[10px] font-medium tracking-[0.22em]">
                  FEMENINO
                </div>

                <h3 className="mt-5 font-[family-name:var(--font-headline)] text-4xl leading-[1.05]">
                  Colección de
                  <br />
                  Mujeres
                </h3>

                <p className="mt-3 max-w-md text-sm text-white/80">
                  Elegancia y Misterio. Pétalos aterciopelados y especias orientales en una danza olfativa.
                </p>

                <div className="mt-7">
                  <span className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-xs font-semibold tracking-wide text-[color:var(--color-neutral-900)]">
                    VER CATÁLOGO
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <Link
            href="/catalogos/unisex"
            className="group relative mt-6 grid overflow-hidden rounded-2xl bg-[#f5e4d8] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 md:grid-cols-2"
          >
            <div className="relative z-10 flex min-h-[360px] flex-col justify-center px-8 py-10 md:min-h-[520px]">
              <div className="inline-flex w-fit rounded-full border border-black/10 bg-white/40 px-3 py-1 text-[10px] font-medium tracking-[0.22em] text-[color:var(--color-neutral-700)]">
                SIN GÉNERO
              </div>

              <h3 className="mt-5 font-[family-name:var(--font-headline)] text-4xl leading-[1.05] text-[color:var(--color-neutral-900)]">
                Colección Unisex
              </h3>

              <p className="mt-3 max-w-md text-sm text-[color:var(--color-neutral-700)]">
                Esencia sin Fronteras. Una exploración de la identidad a través de notas frescas y cítricas combinadas con ámbar cálido.
              </p>

              <div className="mt-7">
                <span className="inline-flex items-center justify-center rounded-md bg-[color:var(--color-primary-700)] px-5 py-3 text-xs font-semibold tracking-wide text-white">
                  VER CATÁLOGO
                </span>
              </div>
            </div>

            <div className="relative min-h-[280px] md:min-h-[320px]">
              <Image
                src="/images/lune.png"
                alt="Colección Unisex"
                fill
                className="pointer-events-none transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}