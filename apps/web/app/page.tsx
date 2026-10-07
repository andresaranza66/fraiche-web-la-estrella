
import Catalogos from "./_components/Catalogos";
import Prices from "./_components/Prices";
import History from "./_components/History";
import Store from "./_components/Store";
import Footer from "./_components/Footer";
import Link from "next/link";
import AtencionExclusiva from "./_components/AtencionExclusiva";
import Exclusive from "./_components/Exclusive";

export default function Home() {
  return (
    <>
    <section className="w-full">
    <main className="relative h-[540px] overflow-hidden flex items-center bg-[var(--color-neutral-100)] max-md:h-auto max-md:bg-[var(--color-neutral-50)]">
  <div className="relative flex w-full items-center justify-between gap-2 px-10 z-10 max-md:flex-col-reverse max-md:gap-0 max-md:px-0">
    <div className="max-w-[536px] max-md:w-full max-md:max-w-none max-md:px-6 max-md:pt-8 max-md:pb-10">
      <h1 className="font-[family-name:var(--font-headline)] text-[48px] text-[var(--color-neutral-900)] max-md:text-[34px] max-md:font-bold max-md:leading-tight">
        Fraiche La Estrella
      </h1>

      <p className="mt-4 font-[family-name:var(--font-body)] text-[16px] text-[var(--color-neutral-900)] max-md:text-[14px] max-md:leading-relaxed max-md:text-gray-500">
        Bienvenidos a la Mejor perfumeria de toda la Estrella, aromas que
        perduran en el tiempo, y enamoran con su esencia.
      </p>

      <div className="flex justify-start gap-2 mt-6 max-md:flex-col max-md:gap-3">
        <Link
          href="/catalogos"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 font-semibold text-white md:h-12 md:w-[161px] max-md:min-h-12 max-md:w-full max-md:py-3 max-md:rounded-xl max-md:text-sm max-md:uppercase"
        >
          Ver Catálogo
        </Link>

        <Link
          href="/"
          className="inline-flex items-center justify-center text-[var(--color-primary)] border-2 border-[var(--color-primary)] rounded-lg md:h-[48px] p-4 max-h-[48px] max-md:min-h-12 max-md:max-h-none max-md:w-full max-md:py-3 max-md:rounded-xl max-md:font-semibold max-md:text-sm max-md:uppercase"
        >
          Agendar Via WhatsApp
        </Link>
      </div>
    </div>

    <aside className="shrink-0 max-md:w-full">
      <img
        src="/images/dreamer.png"
        alt="Dreamer"
        className="h-[380px] w-[536px] rounded-[16px] object-contain max-md:aspect-[3/2] max-md:h-auto max-md:w-full max-md:rounded-none max-md:object-cover"
      />
    </aside>
  </div>
</main>
  <Catalogos />
  <AtencionExclusiva />
  <Prices />
  
  <Exclusive />
  <Store />
  <Footer />
</section>
    </>
  );
}
