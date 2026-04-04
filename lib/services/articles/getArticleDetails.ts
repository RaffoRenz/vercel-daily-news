import { fetchAPI } from "@/lib/api-client"
import { Article } from "@/models/articles.models"
import { ApiResponse } from "@/lib/services/services.interfaces"
import { cacheLife, cacheTag } from "next/cache"

export const getArticleDetails = async (
  slug: string
): Promise<Article | null> => {
  "use cache"
  cacheTag("article")
  cacheLife("max")
  const response = await fetchAPI<ApiResponse<Article>>(
    `/api/articles/${slug}`,
    { method: "GET", next: { revalidate: 3600 } }
  )

  return response.data
}
