import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dutiful-ostrich-936.convex.cloud",
        port: "",
        pathname: "/api/storage/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        port: "",
        pathname: "/tNAvkb0cyel-ge71kl1Pog/*/public",
        search: "",
      },
    ],
  },
};

export default nextConfig;