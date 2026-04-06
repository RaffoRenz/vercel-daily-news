import { getSubscriptionFromCookie } from "@/lib/services/subscription-session"
import HeroSubscriptionClient from "./HeroSubscriptionClient"

export default async function HeroSubscriptionWrapper() {
  const subscription = await getSubscriptionFromCookie()
  return <HeroSubscriptionClient isSubscribed={subscription.isSubscribed} />
}
