
import Image from "next/image";
import { FlaskConical, Gift, MapPin, Phone, Timer } from "lucide-react";

export default function Store() {
  return (
    <section className="w-full bg-[#fbf7ff] px-6 py-20 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-[family-name:var(--font-body)] text-xl tracking-[0.25em] text-[color:var(--color-primary-600)]">
            NUESTRA CASA
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-headline)] text-4xl tracking-wide text-[color:var(--color-neutral-900)] md:text-5xl">
            DÓNDE ENCONTRARNOS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-body)] text-sm leading-6 text-[color:var(--color-neutral-700)] font-[family-name:var(--font-body)]">
            Un oasis olfativo en el corazón de La Estrella. Experimente la alta perfumería en
            un entorno diseñado para los sentidos.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative h-full min-h-[520px] overflow-hidden rounded-2xl border border-[color:var(--color-neutral-200)] bg-white">
            <div className="relative h-full w-full">
              <Image
                src="/images/locationFraiche.png"
                alt="Mapa"
                fill
                className=""
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-neutral-200)] bg-white">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/fraiche.png"
                  alt="Tienda"
                  fill
                  className="object-cover"
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

        <div className="mt-14 border-t border-[color:var(--color-neutral-200)] pt-10">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            <div className="space-y-3">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white">
                <FlaskConical className="h-5 w-5 text-[color:var(--color-primary-700)]" />
              </div>
              <h4 className="font-[family-name:var(--font-headline)] text-sm font-semibold text-[color:var(--color-neutral-900)]">
                Bar de Notas
              </h4>
              <p className="mx-auto max-w-xs font-[family-name:var(--font-body)] text-xs leading-5 text-[color:var(--color-neutral-600)]">
                Explore nuestra biblioteca de esencias puras y cree su propio perfil olfativo con nuestros expertos.
              </p>
            </div>

            <div className="space-y-3">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white">
                <MapPin className="h-5 w-5 text-[color:var(--color-primary-700)]" />
              </div>
              <h4 className="font-[family-name:var(--font-headline)] text-sm font-semibold text-[color:var(--color-neutral-900)]">
                Servicio Premium
              </h4>
              <p className="mx-auto max-w-xs font-[family-name:var(--font-body)] text-xs leading-5 text-[color:var(--color-neutral-600)]">
                Asesoría personalizada de fragancias para encontrar el aroma que mejor define su personalidad.
              </p>
            </div>

            <div className="space-y-3">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white">
                <Gift className="h-5 w-5 text-[color:var(--color-primary-700)]" />
              </div>
              <h4 className="font-[family-name:var(--font-headline)] text-sm font-semibold text-[color:var(--color-neutral-900)]">
                Empaque de Regalo
              </h4>
              <p className="mx-auto max-w-xs font-[family-name:var(--font-body)] text-xs leading-5 text-[color:var(--color-neutral-600)]">
                Cada fragancia se entrega en nuestro empaque artesanal exclusivo, listo para ser obsequiada.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-[color:var(--color-primary-200)] px-6 py-12 text-center md:px-12">
          <h3 className="font-[family-name:var(--font-headline)] text-3xl text-[color:var(--color-neutral-900)]">
            ¿Deseas atención exclusiva?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl font-[family-name:var(--font-body)] text-sm text-[color:var(--color-neutral-700)]">
            Agenda una cita privada en nuestra boutique y descubre el arte de la alta perfumería sin prisas.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl bg-[color:var(--color-primary-700)] px-5 py-3 text-xs font-semibold tracking-wide text-white"
            >
              AGENDAR VÍA WHATSAPP
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-[color:var(--color-primary-700)] bg-transparent px-5 py-3 text-xs font-semibold tracking-wide text-[color:var(--color-primary-700)]"
            >
              VER CATÁLOGO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
