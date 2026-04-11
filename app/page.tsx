import FeaturedArticles from "@/components/featured-news"
import HeroBanner from "@/components/hero/HeroBanner"
import ArticlesLoadingState from "@/components/skeletons/ArticlesLoadingState"
import { Metadata } from "next"
import { Suspense } from "react"

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
      <Suspense fallback={<ArticlesLoadingState />}>
        <FeaturedArticles />
      </Suspense>
    </div>
  )
}
