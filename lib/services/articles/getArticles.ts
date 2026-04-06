"use server"
import { fetchAPI } from "@/lib/api-client"
import { Article, CategoryType } from "@/models/articles.models"
import { ApiResponse, PaginationMeta } from "@/lib/services/services.interfaces"
import { NotFoundError } from "@/lib/services/api-error"

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
}: GetArticlesParams): Promise<{
  articles: Article[] | null
  meta?: PaginationMeta
}> {
  let articles: Article[] | null = null
  let paginationMetadata: PaginationMeta | undefined = undefined
  let apiEndpoint: string = "/api/articles"
  try {
    const params = new URLSearchParams()
    if (page !== undefined) params.append("page", page.toString())
    if (limit !== undefined) params.append("limit", limit.toString())
    if (category) params.append("category", category)
    if (search) params.append("search", search)
    if (featured) params.append("featured", featured.toString())
    if (params.toString()) apiEndpoint = `${apiEndpoint}?${params.toString()}`

    const response = await fetchAPI<ApiResponse<Article[]>>(apiEndpoint, {
      method: "GET",
    })
    articles = response.data
    paginationMetadata = response?.meta?.pagination
  } catch (error) {
    if (error instanceof NotFoundError) {
      return { articles: [], meta: paginationMetadata }
    }

    console.error("Error fetching articles:", error)
  }

  return { articles, meta: paginationMetadata }
}
