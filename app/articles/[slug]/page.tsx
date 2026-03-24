import { getArticles } from "@/lib/services/articles/getArticles"
import { getArticleDetails } from "@/lib/services/articles/getArticleDetails"
import { notFound } from "next/navigation"
import { RichTextRenderer } from "@/components/RichTextRenderer"
import TrendingArticles from "@/components/TrendingArticles"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getArticles({ page: 1, limit: 100 })
  const params = articles?.map((article) => ({
    slug: article.slug,
  }))
  return params || []
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleDetails(slug)

  if (!article) {
    notFound()
  }

  return (
    <div
      data-slot="article-page"
      className="h-full w-full px-4 py-10 lg:mx-auto lg:max-w-4/5"
    >
      <RichTextRenderer content={article.content} />
      <TrendingArticles exceptArticleId={article.id} />
    </div>
  )
}
