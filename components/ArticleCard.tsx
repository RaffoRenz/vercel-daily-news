import { Article } from "@/models/articles.models"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/atoms/card"
import Image from "next/image"
import { Typography } from "@/components/ui/atoms/typography"
import Link from "next/link"
import { Badge } from "@/components/ui/atoms/badge"

interface ArticleCardProps {
  article: Article
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const publishedDate = new Date(article.publishedAt)
  const formattedPublishedDate = `${publishedDate.toLocaleDateString()} - ${publishedDate.toLocaleTimeString()}`

  return (
    <Card className="group relative">
      {article?.image && (
        <div className="relative h-35 w-full overflow-hidden border-b border-chart-1 lg:h-50">
          {article.category && (
            <Badge
              variant="default"
              className="absolute top-2 left-2 z-10 border-chart-2"
            >
              {article.category}
            </Badge>
          )}
          <Image
            src={article.image}
            alt={article.title}
            className="duration-fast aspect-video h-full w-full cursor-pointer object-cover transition-transform hover:scale-110"
            fill
          />
        </div>
      )}
      <CardHeader>
        {article.tags && article.tags.length > 0 && (
          <section className="flex items-center gap-1">
            {article.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="default" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </section>
        )}
        <Link href={`/articles/${article.slug}`} prefetch>
          <Typography variant="h4" weight="semibold" lineHeight="1.2">
            {article.title}
          </Typography>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Typography
          variant="bodySm"
          className="text-card-foreground"
          lineHeight="1.2"
        >
          {article.excerpt}
        </Typography>
      </CardContent>
      <Typography
        variant="caption"
        className="absolute right-4 bottom-2 text-muted-foreground"
        align="right"
        lineHeight="1.2"
      >
        {formattedPublishedDate}
      </Typography>
    </Card>
  )
}

export default ArticleCard
