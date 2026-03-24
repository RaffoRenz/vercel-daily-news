import FeaturedArticles from "@/components/FeaturedArticles"
import HeroBanner from "@/components/HeroBanner"
import TrendingArticles from "@/components/TrendingArticles"

export default function Page() {
  return (
    <div data-slot="homepage" className="h-full w-full">
      <HeroBanner />
      <FeaturedArticles />
    </div>
  )
}
