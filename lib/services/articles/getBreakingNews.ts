import { fetchAPI } from "@/lib/api-client"
import { BreakingNews } from "@/models/articles.models"
import { ApiResponse } from "@/lib/services/services.interfaces"
import { NotFoundError } from "@/lib/services/api-error"
import { cacheLife, cacheTag } from "next/cache"

export async function getBreakingNews(): Promise<BreakingNews | null> {
  "use cache"
  cacheTag("breaking_news")
  cacheLife("breakingNews")

  let breakingNews: BreakingNews | null = null
  try {
    const response = await fetchAPI<ApiResponse<BreakingNews>>(
      "/api/breaking-news",
      { method: "GET" }
    )
    breakingNews = response.data
  } catch (error) {
    if (error instanceof NotFoundError) {
      return null
    }

    console.error("Error fetching breaking news:", error)
  }

  return breakingNews
}
