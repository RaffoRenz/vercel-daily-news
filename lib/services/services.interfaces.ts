interface PaginationMeta {
  hasNextPage: boolean
  hasPreviousPage: boolean
  limit: number
  page: number
  total: number
  totalPages: number
}

export enum ERROR_CODE {
  NOT_FOUND = "NOT_FOUND",
}

interface Error {
  code: ERROR_CODE
  message: string
}

interface ApiResponse<T> {
  data: T
  success: boolean
  meta?: {
    pagination: PaginationMeta
  }

  error?: Error
}

export type { PaginationMeta, Error, ApiResponse }
