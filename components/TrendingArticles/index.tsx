import { getTrendingArticles } from "@/lib/services/articles/getTrendingArticles"
import { Typography } from "@/components/ui/atoms/typography"
import Link from "next/link"
import { Button } from "@/components/ui/atoms/button"
import ArticleCard from "@/components/articles/ArticleCard"
import { cacheLife, cacheTag } from "next/cache"

export default async function TrendingArticles() {
  "use cache"
  cacheLife("minutes")
  cacheTag("trending_articles")
  const featuredArticles = await getTrendingArticles()

  if (!featuredArticles || !featuredArticles?.length) return null

  return (
    <div
      data-component="trending-articles"
      className="h-full w-full px-4 py-10"
    >
      <section className="mb-5 flex w-full items-center justify-between">
        <Typography variant="h3" className="text-2xl font-bold">
          Trending Articles
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {featuredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
