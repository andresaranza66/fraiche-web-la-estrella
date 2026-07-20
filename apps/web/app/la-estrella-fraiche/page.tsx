import type { Metadata } from "next";
import Link from "next/link";
import HeaderMain from "../_components/HeaderMain";
import Footer from "../_components/Footer";

export const metadata: Metadata = {
  title: "Perfumería La Estrella Fraiche | Perfumes en La Estrella, Antioquia",
  description:
    "Fraiche La Estrella es la mejor perfumería en La Estrella, Antioquia. Perfumes originales, decants y asesoría personalizada. Visítanos en la Carrera 60 # 80 Sur, cerca al Parque Principal.",
  keywords: [
    "perfumería La Estrella",
    "perfumes La Estrella Antioquia",
    "Fraiche La Estrella",
    "perfumes originales Antioquia",
    "decants Colombia",
    "perfumería cerca de mí",
  ],
  alternates: { canonical: "/la-estrella-fraiche" },
  openGraph: {
    title: "Perfumería La Estrella Fraiche",
    description:
      "La mejor perfumería en La Estrella, Antioquia. Perfumes originales y asesoría personalizada.",
    url: "https://laestrellafraiche.com/la-estrella-fraiche",
    siteName: "Fraiche La Estrella",
    locale: "es_CO",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PerfumeStore",
  name: "Fraiche La Estrella",
  image: "https://laestrellafraiche.com/images/fraiche.png",
  url: "https://laestrellafraiche.com",
  telephone: "+57 302 2491795",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carrera 60 # 80 Sur",
    addressLocality: "La Estrella",
    addressRegion: "Antioquia",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.1578785,
    longitude: -75.6425274,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:00",
      closes: "16:00",
    },
  ],
};

export default function LaEstrellaFraichePage() {
  return (
    <section className="w-full sm:px-24 sm:pt-24">
      <HeaderMain />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-3xl px-6 py-32">
        <h1 className="font-[family-name:var(--font-headline)] text-5xl text-[color:var(--color-neutral-900)] md:text-6xl">
          Perfumería La Estrella Fraiche
        </h1>

        <p className="mt-6 font-[family-name:var(--font-body)] text-lg leading-8 text-[color:var(--color-neutral-700)]">
          <strong>Fraiche La Estrella</strong> es la perfumería de referencia en{" "}
          <strong>La Estrella, Antioquia</strong>. Ofrecemos perfumes originales,
          decants y asesoría personalizada para que encuentres el aroma que define
          tu personalidad, en un entorno diseñado para los sentidos.
        </p>

        <h2 className="mt-12 font-[family-name:var(--font-headline)] text-3xl text-[color:var(--color-neutral-900)]">
          Dónde encontrarnos
        </h2>
        <p className="mt-4 font-[family-name:var(--font-body)] text-base leading-7 text-[color:var(--color-neutral-700)]">
          Estamos ubicados en la <strong>Carrera 60 # 80 Sur, La Estrella,
          Antioquia</strong>, cerca al Parque Principal. Atendemos de lunes a
          sábado de 10:00 AM a 7:00 PM y los domingos de 11:00 AM a 4:00 PM.
        </p>

        <h2 className="mt-12 font-[family-name:var(--font-headline)] text-3xl text-[color:var(--color-neutral-900)]">
          Nuestro catálogo
        </h2>
        <p className="mt-4 font-[family-name:var(--font-body)] text-base leading-7 text-[color:var(--color-neutral-700)]">
          Explora nuestra colección de fragancias para{" "}
          <Link href="/catalogos/hombres" className="text-[color:var(--color-primary-700)] underline">hombres</Link>,{" "}
          <Link href="/catalogos/damas" className="text-[color:var(--color-primary-700)] underline">damas</Link> y{" "}
          <Link href="/catalogos/unisex" className="text-[color:var(--color-primary-700)] underline">unisex</Link>.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/catalogos"
            className="inline-flex items-center justify-center rounded-xl bg-[color:var(--color-primary-700)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--color-primary-800)]"
          >
            Ver catálogo
          </Link>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=6.1578785,-75.6425274&travelmode=driving"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-[color:var(--color-primary-700)] px-6 py-3 text-sm font-semibold text-[color:var(--color-primary-700)] transition hover:bg-[color:var(--color-primary-100)]"
          >
            Cómo llegar
          </a>
        </div>
      </main>

      <Footer />
    </section>
  );
}