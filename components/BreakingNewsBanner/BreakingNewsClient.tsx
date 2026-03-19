"use client"

import { BreakingNews } from "@/models/articles.models"
import Image from "next/image"
import Typography from "@/components/ui/atoms/typography"

interface BreakingNewsClientProps {
  breakingNewsContent: BreakingNews
}

export const BreakingNewsClient = ({
  breakingNewsContent,
}: BreakingNewsClientProps) => {
  return (
    <div className="relative aspect-video h-full max-h-[50vh] w-full">
      <Image
        src={`/assets/${breakingNewsContent.category}.png`}
        alt={breakingNewsContent.category}
        className="h-full w-full object-cover"
        fill
        priority
      />
      <section className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-start justify-start px-4 py-6">
        <Typography variant="h3" weight="bold">
          {breakingNewsContent.headline}
        </Typography>
      </section>
    </div>
  )
}
