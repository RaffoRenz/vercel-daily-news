import Image from "next/image"
import { Typography } from "@/components/ui/atoms/typography"
import { Button } from "@/components/ui/atoms/button"
import { ChevronRight } from "lucide-react"

export default function HeroBanner() {
  return (
    <section className="relative flex h-[75vh] items-end justify-center overflow-hidden border-b-4 border-b-chart-1 px-4 pb-10 text-center text-white">
      {/* Background Image */}
      <Image
        src="/assets/Vercel_banner.webp" // metti la tua immagine in /public
        alt="Hero background"
        fill
        priority
        className="z-0 object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <Typography
          variant="overline"
          weight="semibold"
          align="center"
          className="text-primary-100 mb-2"
        >
          Real-time updates for modern devs
        </Typography>

        <Typography
          variant="h1"
          weight="bold"
          align="center"
          className="text-primary-100 mb-6 leading-tight md:mb-3"
        >
          What’s new in Vercel & Next.js
        </Typography>

        <Typography
          variant="body"
          align="center"
          className="text-primary-200 leading-relaxed"
        >
          Discover the latest features, releases, and best practices shaping the
          future of frontend development.
        </Typography>
        <Button
          variant="link"
          size="lg"
          className="text-primary-100 mt-6"
          nativeButton={false}
          render={
            <a
              href="https://vercel.com/press"
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          Explore Articles <ChevronRight size={16} />
        </Button>
      </div>
    </section>
  )
}
