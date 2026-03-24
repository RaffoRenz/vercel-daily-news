"use client"

import { BreakingNews } from "@/models/articles.models"
import { Typography } from "@/components/ui/atoms/typography"
import { CircleXIcon, MegaphoneIcon } from "lucide-react"
import { useDisclosure } from "@/hooks/useDisclosure"
import { useCallback } from "react"
import { Badge } from "@/components/ui/atoms/badge"

interface BreakingNewsClientProps {
  breakingNewsContent: BreakingNews
}

export const BreakingNewsClient = ({
  breakingNewsContent,
}: BreakingNewsClientProps) => {
  const { isOpen, close } = useDisclosure(true)

  const handleClose = useCallback(() => {
    close()
  }, [close])

  return isOpen ? (
    <div className="sticky top-(--header-mobile-height) z-20 flex h-fit w-full bg-accent p-1 lg:top-(--header-desktop-height)">
      <section className="flex w-fit items-center justify-start gap-2 rounded-3xl bg-card py-1 pr-1 pl-2">
        <MegaphoneIcon
          className="text-card-foreground"
          size={16}
          strokeWidth={2}
        />
        <Badge variant="secondary" className="hidden md:block">
          {breakingNewsContent.category.toUpperCase()}
        </Badge>
        <Badge variant="secondary" className="block md:hidden">
          {breakingNewsContent.category.slice(0, 3).toUpperCase()}
        </Badge>
      </section>
      <Typography
        as="span"
        variant="caption"
        weight="semibold"
        className="top-1/2 mr-8 ml-2 inline-flex max-w-[90%] items-center overflow-hidden text-nowrap text-ellipsis text-accent-foreground"
      >
        {breakingNewsContent.headline}
      </Typography>
      <CircleXIcon
        className="hover:bg-accent-hover absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer self-center rounded-sm text-accent-foreground"
        size={16}
        onClick={handleClose}
        strokeWidth={1.5}
      />
    </div>
  ) : null
}
