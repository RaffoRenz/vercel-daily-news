import FeaturedArticles from "@/components/featured-news"
import HeroBanner from "@/components/hero/HeroBanner"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vercel Daily News",
  description: "Vercel Daily News homepage with featured and breaking stories.",
  openGraph: {
    title: "Vercel Daily News",
    description:
      "Vercel Daily News homepage with featured and breaking stories.",
  },
}

export default function Page() {
  return (
    <div data-slot="homepage" className="h-full w-full">
      <HeroBanner />
      <FeaturedArticles />
    </div>
  )
}
