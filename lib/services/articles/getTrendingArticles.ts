import { Article } from "@/models/articles.models"
import { fetchAPI } from "@/lib/api-client"
import { ApiResponse } from "@/lib/services/services.interfaces"
import { cacheTag } from "next/cache"

export async function getTrendingArticles(
  excludedArticleIds?: string[]
): Promise<Article[] | null> {
  cacheTag("trending-articles")
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
      cache: "no-store",
      next: { revalidate: 60 },
    })
    trendingArticles = response.data
  } catch (error) {
    console.error("Error fetching trending articles:", error)
  }
  return trendingArticles
}
