export default function Prices() {
    return (
        <main className="pb-24">
            <div className="container flex flex-col items-center ">
                <h2 className="text-1xl text-purple-600">Nuestra Gama de Precios</h2>
                <h1 className="text-4xl font-bold">Precios y Tamaños</h1>
            </div>
            {/* This will be getting from convex database */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-1 md:grid-cols-3 py-15">
            <div className="flex flex-col gap-10 items-center bg-neutral-100/50 p-10 h-[380px]">
                <div>
                    <h3 className="text-[color:var(--color-primary-700)]">FRAGANCIAS COMPLETAS</h3>
                </div>
                <div className="flex flex-col gap-3 ">
                <h3 className="border-b border-neutral-400 flex justify-between">30ml <span className="text-gray-500 pl-50"> 20.800$</span></h3>
                <h3 className="border-b border-neutral-400 flex justify-between">50ml <span className="text-gray-500 pl-50"> 30.200$</span></h3>
                <h3 className="border-b border-neutral-400 flex justify-between">60ml <span className="text-gray-500 pl-50"> 32.400$</span></h3>
                <h3 className="border-b border-neutral-400 flex justify-between">80ml <span className="text-gray-500 pl-50"> 40.600$</span></h3>
                <h3 className="border-b border-neutral-400 flex justify-between">100ml <span className="text-gray-500 pl-50"> 51.800$</span></h3>
                </div>
            </div>
            <div className="flex flex-col gap-10 items-center p-10 bg-[color:var(--color-primary-100)] border-1 border-[color:var(--color-primary-400)] h-[380px]">
                <div>
                    <h3 className="text-[color:var(--color-primary-700)]">RECARGAS</h3>
                </div>
                <div className="flex flex-col gap-3">
                <h3 className="border-b border-neutral-400 flex justify-between">30ml <span className="text-gray-500 pl-50"> 12.400$</span></h3>
                <h3 className="border-b border-neutral-400 flex justify-between">50ml <span className="text-gray-500 pl-50"> 20.000$</span></h3>
                <h3 className="border-b border-neutral-400 flex justify-between">60ml <span className="text-gray-500 pl-50"> 23.300$</span></h3>
                <h3 className="border-b border-neutral-400 flex justify-between">80ml <span className="text-gray-500 pl-50"> 29.900$</span></h3>
                <h3 className="border-b border-neutral-400 flex justify-between">100ml <span className="text-gray-500 pl-50"> 38.900$</span></h3>
                </div>
            </div>
            <div className="flex flex-col gap-5 items-center bg-neutral-100/50 h-[380px] ">
                <div>
                    <h3 className="text-purple-600 pt-15">FEROMONAS</h3>
                </div>
                <div className="flex flex-col gap-3 text-center px-10">
                <h3 className="text-6xl text-[color:var(--color-primary-700)]">1.300</h3>
                <h5 className="text-neutral-950">por gramo</h5>
                <h5 className="text-neutral-950">Potencia tu esencia con un toque magnetico</h5>
                </div>
                <div>
                    <h3 className="text-purple-600 pt-15">FEROMONAS</h3>
                </div>
                <div className="flex flex-col gap-3 text-center px-10">
                <h3 className="text-6xl text-[color:var(--color-primary-700)]">1.300</h3>
                <h5 className="text-neutral-950">por gramo</h5>
                <h5 className="text-neutral-950">Potencia tu esencia con un toque magnetico</h5>
                </div>
            </div>
            <div></div>
            <div></div>
            </div>
        </main>
    );
}