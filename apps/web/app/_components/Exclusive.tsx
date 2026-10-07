import Link from "next/link"

export default function Exclusive() {
    return (
        <main className="bg-primary py-12 h-[284px]">
            <div className="flex gap-4 flex-col items-center">
                <div className="items-center flex flex-col gap-2 md:w-[1120px]">
                    <h1 className="text-white text-center font-bold text-[30px] font-[family-name:var(--font-headline)]">
                        ¿Deseas Atencion Exclusiva?
                    </h1>
                    <p className="text-white text-center text-[16px] font-[family-name:var(--font-body)]">Agenda una cita privada en nuestra boutique y descubre el arte  de la alta perfumeria </p>
                </div>
                <div className="flex justify-start gap-2 mt-6">
                <Link href="/" className="inline-flex items-center justify-center rounded-lg bg-primary px-4 font-semibold text-white md:h-[42px] md:w-[220px] font-[family-name:var(--font-body)] border-2 border-white">
                Agendar Vía WhatsApp
                </Link>
                <Link href="/catalogos" className="inline-flex items-center justify-center text-[var(--color-primary)] border-2 border-[var(--color-primary)] rounded-lg md:w-[232px]font-semibold md:h-[42px] p-4 max-h-[42px] bg-white font-[family-name:var(--font-body)]">
                Ver Catálogo
                </Link>
                </div>
            </div>
        </main>
    ) 
}