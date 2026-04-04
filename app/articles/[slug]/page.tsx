import { getArticles } from "@/lib/services/articles/getArticles"
import { getArticleDetails } from "@/lib/services/articles/getArticleDetails"
import { NotFoundError } from "@/lib/services/api-error"
import { Metadata } from "next"
import ArticleDetailsSection from "@/components/articles/ArticleDetailsSection"
import TrendingArticles from "@/components/TrendingArticles"
import { notFound } from "next/navigation"
import { Article } from "@/models/articles.models"

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const articlesData = await getArticles({ page: 1, limit: 100 })
  const params =
    articlesData?.articles && articlesData?.articles?.length > 0
      ? articlesData.articles?.map((article) => ({
          slug: article.slug,
        })) || []
      : []
  return params || []
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const article = await getArticleDetails(slug)

    if (!article) {
      return {
        title: "Article not found",
        description: "The requested article does not exist.",
      }
    }

    return {
      title: article.title,
      description: article.excerpt,
      metadataBase: new URL(
        process.env.HOST_BASE_URL || "http://localhost:3000"
      ),
      openGraph: {
        title: article.title,
        description: article.excerpt,
        images: [{ url: `/articles/${article.slug}/opengraph-image` }],
      },
    }
  } catch (error) {
    if (error instanceof NotFoundError) {
      return {
        title: "Article not found",
        description: "The requested article does not exist.",
      }
    }

    console.error("Error generating article metadata:", error)
    return {
      title: "Article temporarily unavailable",
      description: "Unable to load metadata for this article right now.",
    }
  }
}

const ArticlePage: React.FC<ArticlePageProps> = async ({ params }) => {
  const { slug } = await params
  let article: Article | null = null

  try {
    article = await getArticleDetails(slug)
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound()
    }
  }

  if (!article) {
    notFound()
  }

  return (
    <div
      data-slot="article-page"
      className="h-full w-full px-4 py-10 lg:mx-auto lg:max-w-4/5"
    >
      <ArticleDetailsSection article={article} />
      <TrendingArticles />
    </div>
  )
}

export default ArticlePage
