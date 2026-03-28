import Link from "next/link"
import { ArrowRightIcon, CompassIcon, NewspaperIcon } from "lucide-react"

import { Button } from "@/components/ui/atoms/button"
import { Typography } from "@/components/ui/atoms/typography"

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100svh-var(--header-mobile-height))] items-center justify-center overflow-hidden px-4 py-12 lg:min-h-[calc(100svh-var(--header-desktop-height))]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--chart-2)/0.14),transparent_35%),radial-gradient(circle_at_80%_75%,hsl(var(--chart-1)/0.18),transparent_42%)]"
      />

      <div className="relative w-full max-w-xl rounded-2xl border border-border bg-card/90 p-6 shadow-lg backdrop-blur sm:p-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground">
          <CompassIcon className="size-4" />
          Route not found
        </div>

        <Typography as="h1" variant="h2" weight="bold" className="mb-2">
          404 - Page not found
        </Typography>

        <Typography variant="body" className="mb-6 text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
          You can continue exploring the latest stories from Vercel Daily News.
        </Typography>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="default"
            nativeButton={false}
            render={
              <Link href="/articles" prefetch>
                <NewspaperIcon className="size-4" />
                Browse articles
                <ArrowRightIcon className="size-4" />
              </Link>
            }
          />

          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/">Go home</Link>}
          />
        </div>
      </div>
    </section>
  )
}
