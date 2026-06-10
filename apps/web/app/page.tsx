
import Catalogos from "./_components/Catalogos";
import HeaderMain from "./_components/HeaderMain";
import Prices from "./_components/Prices";
import History from "./_components/History";
import Store from "./_components/Store";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
    <section className="w-full sm:px-24 sm:pt-24">
      <HeaderMain />
 <Store />
  <main className="relative h-[700px] overflow-hidden flex items-center ">
     
    
    <div
      className="pointer-events-none absolute inset-0 bg-[url('/images/strongBackground.png')] bg-cover bg-center"
      aria-hidden
    />
    
    <div
      className="pointer-events-none absolute inset-0 bg-black/20"
      aria-hidden
    />

    <div className="relative max-w-2xl pl-5">
      <h1 className="font-[family-name:var(--font-headline)] text-7xl text-white">
        Fraiche La Estrella
      </h1>
      <p className="mt-4 font-[family-name:var(--font-body)] text-xl text-white">
        Bienvenidos a la Mejor perfumeria de toda la Estrella, aromas que perduran en el tiempo, y enamoran con su esencia.
      </p>
   </div>
  </main>
  
  <Catalogos />
  <Prices />
  <History />
  <Footer />
</section>
    </>
   
  );
}
