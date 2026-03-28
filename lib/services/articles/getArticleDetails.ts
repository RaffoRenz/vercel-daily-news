import { fetchAPI } from "@/lib/api-client"
import { Article } from "@/models/articles.models"
import { ApiResponse } from "@/lib/services/services.interfaces"
import { cache } from "react"

export const getArticleDetails = cache(
  async (slug: string): Promise<Article | null> => {
    const response = await fetchAPI<ApiResponse<Article>>(
      `/api/articles/${slug}`,
      { method: "GET", next: { revalidate: 3600 } }
    )

    return response.data
  }
)
