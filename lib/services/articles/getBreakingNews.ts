import { fetchAPI } from "@/lib/api-client"
import { BreakingNews } from "@/models/articles.models"
import { ApiResponse } from "@/lib/services/services.interfaces"

export async function getBreakingNews(): Promise<BreakingNews | null> {
  let breakingNews: BreakingNews | null = null
  try {
    // no-cache since we want to fetch always fresh breaking news
    const response = await fetchAPI<ApiResponse<BreakingNews>>(
      "/api/breaking-news",
      { method: "GET", cache: "no-cache" }
    )
    breakingNews = response.data
  } catch (error) {
    console.error("Error fetching breaking news:", error)
  }

  return breakingNews
}
