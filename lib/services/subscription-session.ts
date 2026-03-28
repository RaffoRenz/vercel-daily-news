import { cookies } from "next/headers"
import { SUBSCRIPTION_COOKIE } from "@/lib/constants"

export async function getSubscriptionFromCookie() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SUBSCRIPTION_COOKIE)?.value

  if (!token) {
    return { token: null, isSubscribed: false }
  }

  // Product rule: if session token exists, user is treated as subscribed.
  return { token, isSubscribed: true }
}
