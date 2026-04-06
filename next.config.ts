import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Empty config, ready for options
  cacheComponents: true,
  cacheLife: {
    news: {
      stale: 10 * 60,
      revalidate: 5 * 60,
      expire: 60 * 60,
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
}

export default nextConfig
