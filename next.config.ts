import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    news: {
      stale: 15 * 60,
      revalidate: 5 * 60,
      expire: 60 * 60,
    },
    breakingNews: {
      stale: 5 * 60,
      revalidate: 2 * 60,
      expire: 30 * 60,
    },
  },
  images: {
    minimumCacheTTL: 5 * 60,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=30, s-maxage=300, stale-while-revalidate=60",
          },
        ],
      },
      {
        source: "/:path*(jpg|jpeg|png|avif|webp|svg|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "private, max-age=31536000, immutable", // max-age = 1 year
          },
        ],
      },
      {
        // Fonts
        source: "/:path*(woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // max-age = 1 year
          },
        ],
      },
    ]
  },
}

export default nextConfig
