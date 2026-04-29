"use client"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/atoms/popover"
import { Button } from "@/components/ui/atoms/button"
import { BadgeCheckIcon, BadgeXIcon } from "lucide-react"
import { Spinner } from "@/components/ui/atoms/spinner"
import {
  subscribeAction,
  unsubscribeAction,
} from "@/app/actions/subscription-actions"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

interface SubscriptionStatusPopoverProps {
  isSubscribed: boolean
}

export default function SubscriptionStatusPopover({
  isSubscribed,
}: SubscriptionStatusPopoverProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSubscribe = () => {
    startTransition(async () => {
      await subscribeAction()
      toast.success("Successfully subscribed!")
      router.refresh()
    })
  }

  const handleUnsubscribe = () => {
    startTransition(async () => {
      try {
        await unsubscribeAction()
        toast.success("Successfully unsubscribed!")
        router.refresh()
      } catch {
        toast.error("Unsubscription failed. Please try again.")
      }
    })
  }

  if (!isSubscribed) {
    return (
      <Button
        variant="ghost"
        size="icon-lg"
        aria-label="Subscribe to unlock full access"
        title="Subscribe to unlock full access"
        disabled={isPending}
        onClick={handleSubscribe}
      >
        {isPending ? <Spinner /> : <BadgeXIcon strokeWidth={1.5} />}
      </Button>
    )
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Subscription active - click to unsubscribe"
            title="Subscription active - click to unsubscribe"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : <BadgeCheckIcon strokeWidth={1.5} />}
          </Button>
        }
      />
      <PopoverContent side="bottom" align="end" className="w-64">
        <PopoverHeader>
          <PopoverTitle>Subscription active</PopoverTitle>
          <PopoverDescription>
            You can cancel your current subscription from here.
          </PopoverDescription>
        </PopoverHeader>
        <Button
          variant="destructive"
          type="button"
          className="w-full"
          disabled={isPending}
          onClick={handleUnsubscribe}
          aria-busy={isPending}
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <Spinner /> Updating...
            </span>
          ) : (
            "Unsubscribe"
          )}
        </Button>
      </PopoverContent>
    </Popover>
  )
}
