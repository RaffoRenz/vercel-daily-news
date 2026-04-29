import { headers } from "next/headers"

export async function getSubscriptionFromCookie() {
  const headersList = await headers()
  const isSubscribed = headersList.get("x-is-subscribed") === "true"

  return { token: null, isSubscribed }
}
