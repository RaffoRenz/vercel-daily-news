const apiEndpoint = process.env.API_BASE_URL || ""
const vercelSecurityBypass = process.env.VERCEL_PROTECTION_BYPASS_HEADER || ""
import {
  ApiError,
  NotFoundError,
  ServerError,
  ValidationError,
} from "@/lib/services/api-error"

export const fetchAPI = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  if (!apiEndpoint && !vercelSecurityBypass) {
    throw new Error(
      "Missing api base url and/or vercel Security Bypass - Unable to proceed"
    )
  }
  const headers = new Headers(options?.headers)
  headers.set("x-vercel-protection-bypass", vercelSecurityBypass)
  headers.set("Content-Type", "application/json")

  const response = await fetch(`${apiEndpoint}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const message = `API error ${response.status} on ${endpoint}`

    if (response.status === 404) {
      throw new NotFoundError(message)
    }

    if (response.status >= 400 && response.status < 500) {
      throw new ValidationError(message)
    }

    if (response.status >= 500) {
      throw new ServerError(message)
    }

    throw new ApiError(message)
  }

  const data: T = await response.json()
  return data
}
