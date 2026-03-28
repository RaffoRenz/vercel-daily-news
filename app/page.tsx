import FeaturedArticles from "@/components/FeaturedArticles"
import HeroBanner from "@/components/HeroBanner"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
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
