"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { BadgeCheckIcon, BadgeXIcon, SparklesIcon } from "lucide-react"

import {
  subscribeAction,
  unsubscribeAction,
} from "@/app/actions/subscription-actions"
import { Button } from "@/components/ui/atoms/button"
import { Spinner } from "@/components/ui/atoms/spinner"

interface HeroSubscriptionClientProps {
  isSubscribed: boolean
}

export default function HeroSubscriptionClient({
  isSubscribed,
}: HeroSubscriptionClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSubscriptionToggle = () => {
    startTransition(async () => {
      const result = isSubscribed
        ? await unsubscribeAction()
        : await subscribeAction()
      if (!result.isSubscribed) {
        // Handle error case (e.g., show a toast notification)
        console.error("Failed to update subscription status.")
      }
      router.refresh()
    })
  }

  return (
    <Button
      variant={isSubscribed && !isPending ? "destructive" : "default"}
      onClick={handleSubscriptionToggle}
      disabled={isPending}
      aria-busy={isPending}
      aria-label={
        isSubscribed ? "Unsubscribe from Daily News" : "Subscribe to Daily News"
      }
    >
      {isPending ? (
        <span className="inline-flex items-center gap-2">
          <Spinner /> Updating...
        </span>
      ) : isSubscribed ? (
        <>
          Unsubscribe
          <BadgeXIcon className="size-4" />
        </>
      ) : (
        <>
          <SparklesIcon className="size-4" />
          Subscribe now
          <BadgeCheckIcon className="size-4" />
        </>
      )}
    </Button>
  )
}
