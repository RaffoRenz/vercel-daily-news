import SubscriptionStatusPopover from "./SubscriptionStatusPopover"
import { getSubscriptionFromCookie } from "@/lib/services/subscription-session"

export default async function SubscriptionStatus() {
  const subscription = await getSubscriptionFromCookie()

  return <SubscriptionStatusPopover isSubscribed={subscription.isSubscribed} />
}
