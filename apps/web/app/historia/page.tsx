import HeaderMain from "../_components/HeaderMain";

export default function Historia() {
  return (
    <section className="mx-8">
        <HeaderMain/>
        <main className="relative h-[900px] overflow-hidden flex items-center mt-32">
     
    
    <div
      className="pointer-events-none absolute inset-0 bg-[url('/images/strongBackground.png')] bg-cover bg-center"
      aria-hidden
    />
    
    <div
      className="pointer-events-none absolute inset-0 bg-black/20"
      aria-hidden
    />

    <div className="relative h-full max-w-2xl pl-5 flex flex-col justify-center">
      <h1 className="font-[family-name:var(--font-headline)] text-7xl text-white">
        Nuestra Historia
      </h1>
      <p className="mt-4 font-[family-name:var(--font-body)] text-xl text-white">
        Descubre cómo comenzó nuestra pasión por las fragancias y cómo hemos evolucionado a lo largo de los años para ofrecerte los mejores aromas.
      </p>
   </div>
  </main>
      
    </section>
  );
}