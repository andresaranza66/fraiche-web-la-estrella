import Link from "next/link";

export default function Footer() {
  const year: number = new Date().getFullYear();

  return (
    <footer className="border-y-1 border-black bg-white w-full">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-[family-name:var(--font-headline)] text-sm tracking-[0.35em] text-neutral-900">
              FRAICHE LA ESTRELLA
            </h3>
            <p className="mt-6 max-w-sm font-[family-name:var(--font-body)] text-xs leading-6 tracking-[0.22em] text-neutral-500">
              CREANDO MEMORIAS ATEMPORALES A TRAVÉS
              <br />
              DEL ARTE DE LA ALTA PERFUMERÍA.
            </p>
          </div>

          <div className="md:justify-self-end">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-xs tracking-[0.22em] text-neutral-500 sm:grid-cols-3">
              <h2 className="text-neutral-500">
                AVISO LEGAL
              </h2>
              <h2  className="text-neutral-500">
                POLÍTICA DE PRIVACIDAD
              </h2>
              <h2 className="text-neutral-500">
                TÉRMINOS
              </h2>

              <Link
                href="https://www.facebook.com/profile.php?id=61573741751021"
                className="hover:text-neutral-500"
                target="_blank"
                rel="noreferrer"
              >
                FACEBOOK
              </Link>
              <Link
                href="https://www.instagram.com/fraichelaestrella/"
                className="hover:text-neutral-500"
                target="_blank"
                rel="noreferrer"
              >
                INSTAGRAM
              </Link>
            </div>

            <div className="mt-8 text-xs tracking-[0.22em] text-neutral-500 md:text-right">
              &copy; {year} FRAICHE LA ESTRELLA. TODOS LOS DERECHOS RESERVADOS.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}