import { Article } from "@/models/articles.models"
import { fetchAPI } from "@/lib/api-client"
import { ApiResponse } from "@/lib/services/services.interfaces"
import { NotFoundError } from "@/lib/services/api-error"
import { cacheLife, cacheTag } from "next/cache"

export async function getTrendingArticles(
  excludedArticleIds?: string[]
): Promise<Article[] | null> {
  "use cache"
  cacheLife("minutes")
  cacheTag("trending_articles")
  let trendingArticles: Article[] | null = null
  let apiEndpoint: string = "/api/articles/trending"
  try {
    if (excludedArticleIds) {
      const params = new URLSearchParams()
      const excludedParams = excludedArticleIds.join(",")
      params.append("exclude", excludedParams)
      apiEndpoint = `/api/articles/trending?${params.toString()}`
    }
    const response = await fetchAPI<ApiResponse<Article[]>>(apiEndpoint, {
      method: "GET",
      next: { revalidate: 300 },
    })
    trendingArticles = response.data
  } catch (error) {
    if (error instanceof NotFoundError) {
      return []
    }

    console.error("Error fetching trending articles:", error)
  }
  return trendingArticles
}
