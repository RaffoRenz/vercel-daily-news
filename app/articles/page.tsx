import { Typography } from "@/components/ui/atoms/typography"
import { getArticles } from "@/lib/services/articles/getArticles"
import { CategoryType } from "@/models/articles.models"
import ArticlesSearchView from "@/components/articles/ArticlesSearchView"
import { Metadata } from "next"
import { PAGE_SIZE } from "@/lib/constants"

interface ArticlesPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    order?: string
    page?: string
  }>
}

export const metadata: Metadata = {
  title: "Articles",
  description: "Search and filter the latest Vercel Daily stories.",
  openGraph: {
    title: "Vercel Daily News - Articles",
    description: "Search and filter the latest Vercel Daily stories.",
  },
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const { q, category, order, page } = await searchParams

  const normalizedQuery = (q || "").trim()
  const normalizedCategory =
    category && Object.values(CategoryType).includes(category as CategoryType)
      ? (category as CategoryType)
      : undefined

  const normalizedOrder = order === "oldest" ? "oldest" : "newest"
  const parsedPage = Number(page)
  const normalizedPage =
    Number.isInteger(parsedPage) && parsedPage >= 1 ? parsedPage : 1

  const fetchedArticlesData = await getArticles({
    page: 1,
    limit: normalizedPage * PAGE_SIZE,
    search: normalizedQuery || undefined,
    category: normalizedCategory,
  })

  const articles = fetchedArticlesData?.articles || []

  const sortedArticles = [...articles].sort((a, b) => {
    const timestampA = new Date(a.publishedAt).getTime()
    const timestampB = new Date(b.publishedAt).getTime()
    return normalizedOrder === "oldest"
      ? timestampA - timestampB
      : timestampB - timestampA
  })

  const hasNextPage = fetchedArticlesData?.meta?.hasNextPage || false
  const totalArticles = fetchedArticlesData?.meta?.total

  return (
    <div
      data-slot="articles-page"
      className="h-full w-full px-4 py-10 lg:mx-auto lg:max-w-4/5"
    >
      <section className="mb-5">
        <Typography as="h1" variant="h2" weight="bold">
          All Articles
        </Typography>
        <Typography variant="bodySm" className="text-muted-foreground">
          Latest updates from Vercel and Next.js ecosystem.
        </Typography>
      </section>

      <ArticlesSearchView
        key={`${normalizedQuery}:${normalizedCategory || "all"}:${normalizedOrder}:${normalizedPage}`}
        initialArticles={sortedArticles}
        initialQuery={normalizedQuery}
        initialCategory={normalizedCategory || ""}
        initialOrder={normalizedOrder}
        initialPage={normalizedPage}
        hasNextPage={hasNextPage}
        initialTotal={totalArticles}
      />
    </div>
  )
}
