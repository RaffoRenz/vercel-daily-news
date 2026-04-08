"use client"

import { RefObject } from "react"
import { SearchXIcon, SlidersHorizontalIcon } from "lucide-react"

import ArticleCard from "@/components/articles/ArticleCard"
import { Typography } from "@/components/ui/atoms/typography"
import { Article } from "@/models/articles.models"
import ArticleCardSkeleton from "@/components/skeletons/ArticleCardSkeleton"
import { Button } from "../ui/atoms/button"

interface ArticlesResultsGridProps {
  isPending: boolean
  isLoadingMore: boolean
  hasMore: boolean
  articles: Article[]
  sentinelRef: RefObject<HTMLDivElement | null>
  skeletonCount?: number
  appendSkeletonCount?: number
  query?: string
  category?: string
  onClearFilters?: () => void
}

export default function ArticlesResultsGrid({
  isPending,
  isLoadingMore,
  hasMore,
  articles,
  sentinelRef,
  skeletonCount = 4,
  appendSkeletonCount = 4,
  query = "",
  category = "",
  onClearFilters,
}: ArticlesResultsGridProps) {
  if (isPending && !articles.length) {
    return (
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!articles.length) {
    const hasActiveFilters = query.trim().length > 0 || Boolean(category)

    return (
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div
          aria-hidden="true"
          className="h-1.5 bg-[linear-gradient(90deg,hsl(var(--chart-1)/0.9),hsl(var(--chart-2)/0.8),hsl(var(--chart-3)/0.9))]"
        />

        <div className="flex flex-col items-center px-4 py-10 text-center sm:px-8">
          <div className="mb-4 inline-flex size-11 items-center justify-center rounded-full border border-border bg-muted/40">
            <SearchXIcon className="size-5 text-muted-foreground" />
          </div>

          <Typography as="h2" variant="h5" weight="semibold" className="mb-1">
            No articles found
          </Typography>

          <Typography
            variant="bodySm"
            className="max-w-md text-muted-foreground"
          >
            {hasActiveFilters
              ? "Try a different keyword or category, or reset filters to see all available stories."
              : "There are no articles to display right now. Please try again shortly."}
          </Typography>

          {hasActiveFilters ? (
            <Button
              type="button"
              variant="secondary"
              className="mt-5"
              onClick={onClearFilters}
            >
              <SlidersHorizontalIcon className="size-4" />
              Clear filters
            </Button>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <>
      {isPending ? (
        <div className="mb-3 min-h-5" aria-live="polite">
          <Typography variant="caption" className="text-muted-foreground">
            Updating results...
          </Typography>
        </div>
      ) : null}

      <div
        className="grid grid-cols-2 gap-4 xl:grid-cols-3"
        aria-busy={isPending}
      >
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            prioritizeImage={index === 0}
          />
        ))}

        {isLoadingMore
          ? Array.from({ length: appendSkeletonCount }).map((_, index) => (
              <ArticleCardSkeleton key={`append-loading-${index}`} />
            ))
          : null}
      </div>
      <div ref={sentinelRef} className="h-2 w-full" aria-hidden="true" />
      {!hasMore ? (
        <div className="flex flex-col items-center justify-center gap-2 py-6">
          <Typography
            variant="caption"
            className="mt-4 block text-muted-foreground"
          >
            You reached the end of the results.
          </Typography>
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
          </Button>
        </div>
      ) : null}
    </>
  )
}
