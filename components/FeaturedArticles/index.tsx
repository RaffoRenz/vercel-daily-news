import { getArticles } from "@/lib/services/articles/getArticles"
import { Typography } from "@/components/ui/atoms/typography"
import { Button } from "@/components/ui/atoms/button"
import Link from "next/link"
import SingleArticleCard from "@/components/articles/ArticleCard"
import { cacheLife, cacheTag } from "next/cache"
import ArticleCardSkeleton from "../articles/ArticleCardSkeleton"
import { Suspense } from "react"

const FeaturedArticles: React.FC = async () => {
  "use cache"
  cacheLife("hours")
  cacheTag("featured_articles")
  const featuredArticles = await getArticles({ limit: 6 })

  if (!featuredArticles || !featuredArticles?.articles?.length) return null

  return (
    <div
      data-component="featured-articles"
      className="h-full w-full px-4 py-10 lg:mx-auto lg:max-w-4/5"
    >
      <section className="mb-5 flex h-full w-full items-center justify-between">
        <Typography variant="h3" className="text-2xl font-bold">
          Featured Articles
        </Typography>
        <Button
          variant="link"
          nativeButton={false}
          render={
            <Link href="/articles" prefetch>
              View all
            </Link>
          }
        />
      </section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={Array(6)
            .fill(0)
            .map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
        >
          {featuredArticles?.articles?.map((article) => (
            <SingleArticleCard key={article.id} article={article} />
          ))}
        </Suspense>
      </div>
    </div>
  )
}

export default FeaturedArticles
