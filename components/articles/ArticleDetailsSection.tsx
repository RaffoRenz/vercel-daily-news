import { Badge } from "../ui/atoms/badge"
import { Typography } from "../ui/atoms/typography"
import Image from "next/image"
import ArticleContentPaywall from "./ArticleContentPaywall"
import { getArticleDetails } from "@/lib/services/articles/getArticleDetails"
import { NotFoundError } from "@/lib/services/api-error"
import { notFound } from "next/navigation"
import { connection } from "next/server"

interface ArticleDetailsSectionProps {
  slug: string
}

export default async function ArticleDetailsSection({
  slug,
}: ArticleDetailsSectionProps) {
  await connection()
  let article

  try {
    article = await getArticleDetails(slug)
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound()
    }

    throw error
  }

  if (!article) {
    notFound()
  }

  return (
    <div data-component={`article-details-${article.slug}`}>
      <section className="mb-6 space-y-3 border-b border-border pb-5">
        <Badge variant="secondary">{article.category}</Badge>
        <Typography as="h1" variant="h2" weight="bold">
          {article.title}
        </Typography>
        <Typography variant="bodySm" className="text-muted-foreground">
          By {article.author.name} •{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </Typography>
      </section>
      <section className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl border border-border">
        <Image
          src={article.image}
          alt={article.title}
          fill
          fetchPriority="high"
          loading="eager"
          className="object-cover"
        />
      </section>
      <ArticleContentPaywall content={article.content} />
    </div>
  )
}
