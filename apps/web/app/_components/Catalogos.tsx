import Link from "next/link";
import RotatingBackground from "./RotatingBackground";

export default function Catalogos() {
  return (
    <main className=" py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-1 md:grid-cols-3">
        <Link
          href="/catalogos/hombres"
          className="group relative h-[420px] overflow-hidden rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <RotatingBackground
            images={["/images/strong.png", "/images/lune.png", "/images/strong.png"]}
            intervalMs={9000}
            startDelayMs={0}
            className="pointer-events-none absolute inset-0"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-blue-200/20"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-black/25 backdrop-blur-md [mask-image:linear-gradient(to_top,black_0%,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_55%,transparent_100%)]"
            aria-hidden
          />

          <div className="relative flex h-full flex-col justify-end p-6 text-center">
            <h2 className="font-[family-name:var(--font-headline)] text-2xl text-white">
              Para hombres
            </h2>
            <p className="mt-2 font-[family-name:var(--font-body)] text-white/90">
              Descubre todas nuestras opciones
            </p>
          </div>
        </Link>

        <Link
          href="/catalogos/damas"
          className="group relative h-[420px] overflow-hidden rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <RotatingBackground
            images={[
              "/images/bakcgroundDamas.png",
              "/images/dreamer.png",
              "/images/solei.png",
            ]}
            intervalMs={9000}
            startDelayMs={900}
            className="pointer-events-none absolute inset-0"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-pink-300/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-black/25 backdrop-blur-md [mask-image:linear-gradient(to_top,black_0%,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_55%,transparent_100%)]"
            aria-hidden
          />

          <div className="relative flex h-full flex-col justify-end p-6 text-center">
            <h2 className="font-[family-name:var(--font-headline)] text-2xl text-pink-500 ">
              Para Damas
            </h2>
            <p className="mt-2 font-[family-name:var(--font-body)] text-pink-500/90">
              Descubre nuestros mejores perfumes
            </p>
          </div>
        </Link>

        <Link
          href="/catalogos/unisex"
          className="group relative h-[420px] overflow-hidden rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 "
        >
          <RotatingBackground
            images={["/images/queen.png", "/images/strong.png", "/images/dreamer.png"]}
            intervalMs={9000}
            startDelayMs={1800}
            className="pointer-events-none absolute inset-0"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-orange-500/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-black/25 backdrop-blur-md [mask-image:linear-gradient(to_top,black_0%,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_55%,transparent_100%)]"
            aria-hidden
          />

          <div className="relative flex h-full flex-col justify-end p-6 text-center">
            <h2 className="font-[family-name:var(--font-headline)] text-2xl text-white">
              Unisex
            </h2>
            <p className="mt-2 font-[family-name:var(--font-body)] text-white/90">
              Descubre nuestra colección de productos
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
