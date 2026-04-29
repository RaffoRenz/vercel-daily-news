"use client"

import { subscribeAction } from "@/app/actions/subscription-actions"
import { Button } from "@/components/ui/atoms/button"
import { Spinner } from "@/components/ui/atoms/spinner"
import { Typography } from "@/components/ui/atoms/typography"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

interface SubscribeCtaProps {
  title?: string
  description?: string
}

export default function SubscribeCta({
  title = "Subscribe to unlock full access",
  description = "Get full article content and premium Vercel Daily updates.",
}: SubscribeCtaProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSubscribe = () => {
    startTransition(async () => {
      try {
        await subscribeAction()
        toast.success("Successfully subscribed!")
        router.refresh()
      } catch {
        toast.error("Subscription failed. Please try again.")
      }
    })
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <Typography as="h2" variant="h4" weight="bold" className="mb-2">
        {title}
      </Typography>
      <Typography variant="bodySm" className="text-muted-foreground">
        {description}
      </Typography>
      <Button
        className="mt-4"
        onClick={handleSubscribe}
        disabled={isPending}
        aria-busy={isPending}
      >
        {isPending ? (
          <span className="inline-flex items-center gap-2">
            <Spinner /> Subscribing...
          </span>
        ) : (
          "Subscribe now"
        )}
      </Button>
    </section>
  )
}
