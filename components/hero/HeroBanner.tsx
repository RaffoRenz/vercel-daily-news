import Image from "next/image"
import Link from "next/link"
import { Typography } from "@/components/ui/atoms/typography"
import { Button } from "@/components/ui/atoms/button"
import { ArrowRightIcon, NewspaperIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/atoms/skeleton"
import { Suspense } from "react"
import HeroSubscriptionWrapper from "./HeroSubscriptionWrapper"

export default function HeroBanner() {
  return (
    <section className="px-4 py-8 lg:py-10">
      <div className="mx-auto grid w-full overflow-hidden rounded-2xl border border-border bg-card lg:max-w-4/5 lg:grid-cols-2">
        <div className="relative h-72 lg:h-105">
          <Image
            src="/assets/Vercel_banner.webp"
            alt="Vercel Daily News hero"
            fill
            fetchPriority="high"
            loading="eager"
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/10 via-black/25 to-background/75 lg:to-transparent" />
        </div>

        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10">
          <Typography
            variant="overline"
            weight="semibold"
            className="text-chart-2"
          >
            Real-time updates for modern devs
          </Typography>

          <Typography variant="h1" weight="bold" className="leading-tight">
            What&apos;s new in Vercel and Next.js
          </Typography>

          <Typography variant="body" className="text-muted-foreground">
            Discover the latest features, releases, and best practices shaping
            the future of frontend development.
          </Typography>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Suspense fallback={<Skeleton className="h-10 w-48 rounded-md" />}>
              <HeroSubscriptionWrapper />
            </Suspense>
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <Link href="/articles" prefetch>
                  <NewspaperIcon className="size-4" />
                  Browse articles
                  <ArrowRightIcon className="size-4" />
                </Link>
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}
