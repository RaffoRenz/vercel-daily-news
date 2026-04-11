import { Article } from "@/models/articles.models"
import { Card, CardHeader, CardContent } from "../ui/atoms/card"
import { Typography } from "@/components/ui/atoms/typography"
import { Badge } from "@/components/ui/atoms/badge"
import Image from "next/image"
import Link from "next/link"

interface ArticleCardProps {
  article: Article
  prioritizeImage?: boolean
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  prioritizeImage = false,
}) => {
  const publishedDate = new Date(article.publishedAt)

  return (
    <Card className="group h-full overflow-hidden">
      <Link
        href={`/articles/${article.slug}`}
        prefetch
        className="flex h-full flex-col focus-visible:outline-none"
      >
        <div className="relative h-44 w-full overflow-hidden border-b border-border sm:h-48 lg:h-44 xl:h-48">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              fetchPriority={prioritizeImage ? "high" : "auto"}
              loading={prioritizeImage ? "eager" : "lazy"}
              className="duration-fast object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-muted" aria-hidden="true" />
          )}

          <Badge
            variant="default"
            className="absolute top-2 left-2 z-10 border-chart-2 capitalize"
          >
            {article.category}
          </Badge>
        </div>

        <CardHeader className="pb-2">
          {article.tags && article.tags.length > 0 ? (
            <section className="mb-2 flex flex-wrap items-center gap-1.5">
              {article.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={`${article.id}-${tag}-${index}`}
                  variant="secondary"
                  className="rounded-full text-[11px]"
                >
                  {tag}
                </Badge>
              ))}
            </section>
          ) : null}

          <Typography
            variant="h4"
            weight="semibold"
            lineHeight="1.2"
            className="line-clamp-2 min-h-13 pt-1"
          >
            {article.title}
          </Typography>
          <Typography
            variant="caption"
            className="pt-1 text-muted-foreground"
            lineHeight="1.2"
          >
            {article.author.name}
          </Typography>
        </CardHeader>

        <CardContent>
          <Typography
            variant="bodySm"
            className="line-clamp-3 text-card-foreground"
            lineHeight="1.3"
          >
            {article.excerpt}
          </Typography>
          <Typography
            variant="caption"
            className="mt-3 block text-muted-foreground"
            align="right"
            lineHeight="1.2"
          >
            {publishedDate.toLocaleDateString()}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}

export default ArticleCard
