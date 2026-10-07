import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year: number = new Date().getFullYear();

  return (
    <footer className="border-y-1 border-black bg-[var(--color-footer-bg)] w-full">
      <div className="mx-auto max-w-6xl py-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <h3 className="font-[family-name:var(--font-headline)] text-bold text-[24px] text-white">
              Fraiche
            </h3>
            <p className="mt-6 max-w-sm text-[14px] font-[family-name:var(--font-body)] leading-6 text-neutral-500 text-[var(--color-footer-text)]">
              Fragancias importadas de calidad
              <br />
              premium en el corazon de la Estrella.
            </p>
          </div>

          <div className="flex flex-col gap-2 ">
            <h1 className="font-[family-name:var(--font-body)] text-white text-[14px]">Enlaces</h1>
            <Link href="/" className="text-[var(--color-footer-text)]">Inicio</Link>
            <Link href="/catalogos" className="text-[var(--color-footer-text)]">Catalogo</Link>
            <Link href="/historia" className="text-[var(--color-footer-text)]">Nosotros</Link>
            <Link href="/" className="text-[var(--color-footer-text)]">Contacto</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-[family-name:var(--font-body)] text-white text-[14px]">Contacto</h1>
            <p className="text-[var(--color-footer-text)]">Carrera 60 # 80 Sur (diagonal al bancolombia de la Estrella)</p>
            <p className="text-[var(--color-footer-text)]">+57 302 2491795</p>
            <p className="text-[var(--color-footer-text)]">fraichelaestrella@gmail.com</p>
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-body)] text-white text-[14px]">Siguenos</h1>
            
            <div className="flex gap-2 pt-4">
            <a href="https://www.instagram.com/fraichelaestrella/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/instagram.png"
              alt="Instagram"
              width={36}
              height={36}
            />
            </a>

            <a href="https://www.facebook.com/profile.php?id=61573741751021" target="_blank" rel="noopener noreferrer">
             <Image
              src="/images/facebook.png"
              alt="Facebook"
              width={36}
              height={36}
            />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
             <Image
              src="/images/X.png"
              alt="X"
              width={36}
              height={36}
            />
            </a>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-[var(--color-footer-border)] mt-10"></div>

        <div className="flex w-full flex-col gap-4 pt-6 text-[12px] text-[color:var(--color-footer-text)] font-[family-name:var(--font-body)] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Fraiche La Estrella. Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:shrink-0">
            <p>Políticas de privacidad</p>
            <p>Términos y condiciones</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
