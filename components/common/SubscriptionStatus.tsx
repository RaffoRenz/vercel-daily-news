// import { UserRoundXIcon, UserRoundCheckIcon } from "lucide-react"
import { Button } from "@/components/ui/atoms/button"
// import { cookies } from "next/headers"

export default async function SubscriptionStatus() {
  // const cookieStore = await cookies()
  // const isSubscribed = cookieStore.get("subscribed")?.value === "true"
  return (
    <Button
      variant="outline"
      size="icon-lg"
      // aria-label={isSubscribed ? "Subscribed" : "Not Subscribed"}
    >
      {/* {isSubscribed ? (
        <UserRoundCheckIcon className="h-4 w-4" />
      ) : (
        <UserRoundXIcon className="h-4 w-4" />
      )} */}
    </Button>
  )
}
