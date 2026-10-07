const FULL = [
  ["30ml", "$20.800"], ["50ml", "$30.200"], ["60ml", "$32.400"],
  ["80ml", "$40.600"], ["100ml", "$51.800"],
];
const REFILL = [
  ["30ml", "$12.400"], ["50ml", "$20.000"], ["60ml", "$23.300"],
  ["80ml", "$29.900"], ["100ml", "$38.900"],
];

function PriceCard({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      {/* header bar */}
      <div className="bg-[var(--color-primary)] py-4 text-center">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white font-[family-name:var(--font-dm-sans)]">
          {title}
        </h3>
      </div>

      {/* rows */}
      <ul className="divide-y divide-[var(--color-neutral-200)] px-5">
        {rows.map(([size, price]) => (
          <li key={size} className="flex items-center justify-between py-3 text-sm">
            <span className="text-[var(--color-neutral-800)]">{size}</span>
            <span className="font-semibold text-[var(--color-neutral-900)]">{price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Prices() {
  return (
    <main className="bg-[var(--color-neutral-100)] py-22 my-[-10px] md:min-w-[1184px] w-full bg-neutral-50 px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {/* header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)] font-[family-name:var(--font-dm-sans)]">
            Precios justos
          </h3>
          <h1 className="text-4xl font-semibold text-[var(--color-neutral-900)] font-[family-name:var(--font-headline)]">
            Precios y tamaños
          </h1>
        </div>

        {/* two cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <PriceCard title="Fragancias completas" rows={FULL} />
          <PriceCard title="Recargas" rows={REFILL} />
        </div>

        {/* footer note */}
        <div className="rounded-md border border-[var(--color-primary)] bg-[var(--color-primary-200)] p-4 text-center text-sm md:min-h-[58px]">
          <span className="font-semibold text-[var(--color-primary)]">Feromonas: </span>
          <span className="font-semibold text-[var(--color-neutral-900)]">$1.300 por gramo</span>
          <span className="text-[var(--color-neutral-600)]"> · Potencia tu esencia con un toque magnético y duradero.</span>
        </div>
      </div>
    </main>
  );
}