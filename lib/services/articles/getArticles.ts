import { fetchAPI } from "@/lib/api-client"
import { Article, CategoryType } from "@/models/articles.models"
import { ApiResponse } from "@/lib/services/services.interfaces"
import { cacheTag } from "next/cache"

interface GetArticlesParams {
  page?: number
  limit?: number
  category?: CategoryType
  search?: string
  featured?: boolean
}

export async function getArticles({
  page,
  limit,
  category,
  search,
  featured,
}: GetArticlesParams): Promise<Article[] | null> {
  "use cache"
  cacheTag("articles", search ? `search:${search}` : "all")
  let articles: Article[] | null = null
  let apiEndpoint: string = "/api/articles"
  try {
    const params = new URLSearchParams()
    if (page) params.append("page", page.toString())
    if (limit) params.append("limit", limit.toString())
    if (category) params.append("category", category)
    if (search) params.append("search", search)
    if (featured) params.append("featured", featured.toString())
    if (params.toString()) apiEndpoint = `${apiEndpoint}?${params.toString()}`

    const response = await fetchAPI<ApiResponse<Article[]>>(apiEndpoint, {
      method: "GET",
      cache: "no-store",
      next: { revalidate: 300 },
    })
    articles = response.data
  } catch (error) {
    console.error("Error fetching articles:", error)
  }

  return articles
}
