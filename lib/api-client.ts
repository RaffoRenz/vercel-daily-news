const apiEndpoint = process.env.API_BASE_URL || ""
const vercelSecurityBypass = process.env.VERCEL_PROTECTION_BYPASS_HEADER || ""

export const fetchAPI = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  if (!apiEndpoint && !vercelSecurityBypass) {
    throw new Error(
      "Missing api base url and/or vercel Security Bypass - Unable to proceed"
    )
  }
  const response = await fetch(`${apiEndpoint}${endpoint}`, {
    ...options,
    headers: {
      "x-vercel-protection-bypass": vercelSecurityBypass,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data: T = await response.json()
  return data
}
