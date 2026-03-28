"use client"

import { Button } from "@/components/ui/atoms/button"
import { Typography } from "@/components/ui/atoms/typography"

export default function ArticlesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <Typography as="h2" variant="h4" weight="bold">
        Unable to load articles
      </Typography>
      <Typography variant="bodySm" className="text-muted-foreground">
        {error.message || "Something went wrong while loading this page."}
      </Typography>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
