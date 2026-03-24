import { getArticles } from "@/lib/services/articles/getArticles"
import { Typography } from "@/components/ui/atoms/typography"
import { Button } from "@/components/ui/atoms/button"
import Link from "next/link"
import ArticleCard from "@/components/ArticleCard"

const FeaturedArticles: React.FC = async () => {
  const featuredArticles = await getArticles({ limit: 6 })

  if (!featuredArticles || !featuredArticles?.length) return null

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
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {featuredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedArticles
