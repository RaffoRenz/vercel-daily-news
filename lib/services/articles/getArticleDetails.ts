import { fetchAPI } from "@/lib/api-client"
import { Article } from "@/models/articles.models"
import { ApiResponse } from "@/lib/services/services.interfaces"
import { cacheTag } from "next/cache"

export async function getArticleDetails(slug: string): Promise<Article | null> {
  "use cache"
  cacheTag("articles", slug)
  let article: Article | null = null
  try {
    const response = await fetchAPI<ApiResponse<Article>>(
      `/api/articles/${slug}`,
      { method: "GET", cache: "no-store", next: { revalidate: 60 } }
    )
    article = response.data
  } catch (error) {
    console.error("Error fetching article details:", error)
  }
  return article
}
