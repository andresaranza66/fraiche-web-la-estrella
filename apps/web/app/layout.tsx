import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laestrellafraiche.com"),
  title: {
    default: "Fraiche La Estrella | Perfumería en La Estrella, Antioquia",
    template: "%s | Fraiche La Estrella",
  },
  description:
    "Perfumería en La Estrella, Antioquia. Perfumes originales, decants y asesoría personalizada. Aromas que perduran y enamoran con su esencia.",
  keywords: [
    "perfumería La Estrella",
    "perfumes La Estrella Antioquia",
    "Fraiche La Estrella",
    "perfumes originales Colombia",
    "decants",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Fraiche La Estrella",
    description: "La mejor perfumería en La Estrella, Antioquia.",
    url: "https://laestrellafraiche.com",
    siteName: "Fraiche La Estrella",
    locale: "es_CO",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="es">
      <body
        className={`${playfairDisplay.variable} ${manrope.variable} min-h-dvh bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}
