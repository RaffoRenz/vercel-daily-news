import { fetchAPI } from "@/lib/api-client"
import { BreakingNews } from "@/models/articles.models"
import { ApiResponse } from "@/lib/services/services.interfaces"
import { NotFoundError } from "@/lib/services/api-error"

export async function getBreakingNews(): Promise<BreakingNews | null> {
  let breakingNews: BreakingNews | null = null
  try {
    // Always dynamic to keep banner content fresh.
    const response = await fetchAPI<ApiResponse<BreakingNews>>(
      "/api/breaking-news",
      { method: "GET", cache: "no-store" }
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
