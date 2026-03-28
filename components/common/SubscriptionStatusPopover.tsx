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
import { unsubscribeAction } from "@/app/actions/subscription-actions"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

interface SubscriptionStatusPopoverProps {
  isSubscribed: boolean
}

export default function SubscriptionStatusPopover({
  isSubscribed,
}: SubscriptionStatusPopoverProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleUnsubscribe = () => {
    startTransition(async () => {
      await unsubscribeAction()
      router.refresh()
    })
  }

  if (!isSubscribed) {
    return (
      <Button
        variant="default"
        size="lg"
        aria-label="Subscription inactive"
        disabled={isPending}
      >
        {isPending ? (
          <Spinner />
        ) : (
          <>
            <span className="hidden lg:block">Subscribe</span>
            <BadgeCheckIcon strokeWidth={1.5} />
          </>
        )}
      </Button>
    )
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="destructive"
            size="lg"
            aria-label="Subscription active"
            disabled={isPending}
          >
            {isPending ? (
              <Spinner />
            ) : (
              <>
                <span className="hidden lg:block">Unsubscribe</span>

                <BadgeXIcon strokeWidth={1.5} />
              </>
            )}
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
