import type { MetadataRoute } from "next";
import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/api";

const BASE_URL = "https://laestrellafraiche.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/la-estrella-fraiche`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/catalogos`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/catalogos/hombres`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/catalogos/damas`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/catalogos/unisex`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/historia`, changeFrequency: "monthly", priority: 0.5 },
  ];

  let perfumeRoutes: MetadataRoute.Sitemap = [];
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (convexUrl) {
    try {
      const client = new ConvexHttpClient(convexUrl);
      const perfumes = await client.query(api.perfumes.list, {});
      perfumeRoutes = perfumes.map((p) => ({
        url: `${BASE_URL}/catalogos/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    } catch {
      // If Convex is unreachable at build time, ship the static routes only.
    }
  }

  return [...staticRoutes, ...perfumeRoutes];
}
