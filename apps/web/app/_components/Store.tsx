import Image from "next/image";
import {  MapPin, Phone, Timer } from "lucide-react";

export default function Store() {

  return (
    <section className="w-full bg-[#fbf7ff] sm:py-20 py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="sr-only"> Perfumes La Estrella  Fraiche </h1>
          <p className="text-xs font-[family-name:var(--font-body)] text-xl tracking-[0.25em] text-[color:var(--color-primary-600)]">
            NUESTRA CASA
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-headline)] text-4xl tracking-wide text-[color:var(--color-neutral-900)] md:text-5xl">
            DÓNDE ENCONTRARNOS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-body)] text-sm leading-6 text-[color:var(--color-neutral-700)] max-md:hidden">
          Un oasis olfativo en el corazón de La Estrella. Experimente la alta perfumería en
          un entorno diseñado para los sentidos.
        </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.65fr]">
         <div className="relative h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] overflow-hidden rounded-2xl">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=6.1578785,-75.6425274&travelmode=driving"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative h-full w-full cursor-pointer"
          >
            <Image
              src="/images/locationFraiche.png"
              alt="Mapa"
              fill
              className="p-4 rounded-xl"
              sizes="100vw"
              priority={false}
            />
          </a>
        </div>

          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl p-4">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/fraiche.png"
                  alt="Tienda"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-6">
              <h3 className="font-[family-name:var(--font-headline)] text-2xl text-[color:var(--color-neutral-900)]">
                Visítanos
              </h3>

              <div className="mt-5 space-y-4 font-[family-name:var(--font-body)] text-sm text-[color:var(--color-neutral-700)]">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-[color:var(--color-primary-700)]" />
                  <div>
                    <p className="font-semibold text-[color:var(--color-neutral-900)]">Dirección</p>
                    <p>Carrera 60 # 80 Sur, La Estrella, Antioquia, Colombia</p>
                    <p className="text-[color:var(--color-neutral-600)]">(Cerca al Parque Principal)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Timer className="mt-0.5 h-4 w-4 text-[color:var(--color-primary-700)]" />
                  <div>
                    <p className="font-semibold text-[color:var(--color-neutral-900)]">Horario de Atención</p>
                    <p>Lunes - Sábado</p>
                    <p className="text-[color:var(--color-neutral-600)]">10:00 AM - 7:00 PM</p>
                    <p>Domingos</p>
                    <p className="text-[color:var(--color-neutral-600)]">11:00 AM - 4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-[color:var(--color-primary-700)]" />
                  <div>
                    <p className="font-semibold text-[color:var(--color-neutral-900)]">Contacto</p>
                    <p className="text-[color:var(--color-neutral-600)]">+57 302 2491795</p>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=6.1578785,-75.6425274&travelmode=driving"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[color:var(--color-primary-700)] px-4 py-3 text-xs font-semibold tracking-wide !text-white hover:cursor-pointer"
              >
                CÓMO LLEGAR
              </a>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
