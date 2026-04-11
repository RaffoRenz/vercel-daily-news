import { CategoryType } from "@/models/articles.models"
import ArticlesSearchView from "./ArticlesSearchView"
import { getArticles } from "@/lib/services/articles/getArticles"
import { PAGE_SIZE } from "@/lib/constants"
import { cacheLife, cacheTag } from "next/cache"

interface ArticlesSearchViewWrapperProps {
  searchParams: Promise<{
    q?: string
    category?: string
    order?: string
    page?: string
  }>
}

async function getInitialArticlesPage(params: {
  page: number
  limit: number
  search?: string
  category?: CategoryType
}) {
  "use cache"
  cacheLife("news")
  cacheTag("articles_listing")

  return getArticles(params)
}

export default async function ArticlesSearchViewWrapper({
  searchParams,
}: ArticlesSearchViewWrapperProps) {
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

  const fetchedArticlesData = await getInitialArticlesPage({
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
    <ArticlesSearchView
      initialArticles={sortedArticles}
      initialQuery={normalizedQuery}
      initialCategory={normalizedCategory || ""}
      initialOrder={normalizedOrder}
      initialPage={normalizedPage}
      hasNextPage={hasNextPage}
      initialTotal={totalArticles}
    />
  )
}
