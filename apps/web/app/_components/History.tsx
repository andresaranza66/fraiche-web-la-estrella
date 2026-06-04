import Image from "next/image";

export default function History() {
    return (
        <main className="flex bg-neutral-100 p-8">
            <aside className="flex-1 w-[500px]">
                <Image src="/images/dreamer.png" alt="History" width={500} height={500} />
            </aside>
            <div
            className="flex-1 flex flex-col justify-center gap-9 pr-12"
            >
                <div className="flex flex-col justify-center gap-9">
                <h4 className="text-[var(--color-primary-600)]">INSPIRADO EN ORIGINALES</h4>
                <h3 className="text-5xl ">Un Compromiso Con La Calidad
                </h3>
                <h5>Creemos que el lujo debe de ser accecible para todos sin comprometer la integridad del aroma. En Fraiche, encontraras las mejores esencias de alta calidad a precios accesibles.</h5>
            </div>
                <div className="mt-12 flex gap-5">
                <div className="max-w-[300px] flex flex-col gap-4">
                    <h2 className="text-xl font-bold">Fragancias Premium</h2>
                    <h3 >
                        Perfumes inspirados en las mejores marcas del mundo con excelente duración y calidad.
                    </h3>
                </div>
                <div className="max-w-[300px] flex flex-col gap-4">
                    <h2 className="text-xl font-bold">Mejor Relacion Calidad-Precio</h2>
                    <h3>
                        Ofrecemos las mejores fragancias a precios accesibles teniendo la mejor calidad en el mercado de las fragancias inspiradas en marcas premium.
                    </h3>
                </div>
                </div>

            </div>
        </main>
    );
}