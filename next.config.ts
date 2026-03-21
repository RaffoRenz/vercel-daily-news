import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Empty config, ready for options
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
