import { Badge } from "../ui/atoms/badge"
import { Typography } from "../ui/atoms/typography"
import Image from "next/image"
import ArticleContentPaywall from "./ArticleContentPaywall"
import { Article } from "@/models/articles.models"
import { Suspense } from "react"

interface ArticleDetailsSectionProps {
  article: Article
}

export default function ArticleDetailsSection({
  article,
}: ArticleDetailsSectionProps) {
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
      <Suspense
        fallback={<Typography variant="body">Loading content...</Typography>}
      >
        <ArticleContentPaywall content={article.content} />
      </Suspense>
    </div>
  )
}
