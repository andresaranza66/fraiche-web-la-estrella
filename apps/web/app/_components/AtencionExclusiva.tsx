import { FlaskConical, Gift, MapPin } from "lucide-react";
export default function AtencionExclusiva(){

    return (
          <div className="rounded-2xl bg-[color:var(--white)] px-6 py-12 text-center md:px-12 min-h-[432px]">
            <div className="max-w-[var(--container-max-width)] mx-auto">
            <h3 className="text-sm font-semibold text-[color:var(--color-primary)] uppercase mb-2">
                Experiencia Fraiche
            </h3>
          <h1 className="font-[family-name:var(--font-headline)] text-3xl text-[color:var(--color-neutral-900)] font-bold">
            Servicio Exclusivos Para Ti
          </h1>
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
        </div>
    )
}