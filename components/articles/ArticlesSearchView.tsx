"use client"

import ArticlesFiltersBar from "@/components/search/ArticlesFiltersBar"
import ArticlesResultsGrid from "@/components/search/ArticlesResultsGrid"
import { useInfiniteArticles } from "@/hooks/useInfiniteArticles"
import { Article, CategoryType } from "@/models/articles.models"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"

interface ArticlesSearchViewProps {
  initialArticles: Article[]
  initialQuery: string
  initialCategory: CategoryType | ""
  initialOrder: "newest" | "oldest"
  initialPage: number
  hasNextPage: boolean
  initialTotal?: number
}

export default function ArticlesSearchView({
  initialArticles,
  initialQuery,
  initialCategory,
  initialOrder,
  initialPage,
  hasNextPage,
  initialTotal,
}: ArticlesSearchViewProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState<CategoryType | "">(initialCategory)
  const [order, setOrder] = useState<"newest" | "oldest">(initialOrder)

  const categories = useMemo(
    () =>
      Object.values(CategoryType).map((value) => ({
        value,
        label: value.replace(/-/g, " "),
      })),
    []
  )

  const navigateWithFilters = useCallback(
    (nextQuery: string, nextCategory: CategoryType | "", nextPage: number) => {
      const params = new URLSearchParams(currentParams.toString())

      const normalizedQuery = nextQuery.trim()

      if (normalizedQuery) {
        params.set("q", normalizedQuery)
      } else {
        params.delete("q")
      }

      if (nextCategory) {
        params.set("category", nextCategory)
      } else {
        params.delete("category")
      }

      if (nextPage > 1) {
        params.set("page", nextPage.toString())
      } else {
        params.delete("page")
      }

      const queryString = params.toString()
      const nextHref = queryString ? `${pathname}?${queryString}` : pathname

      startTransition(() => {
        router.push(nextHref)
      })
    },
    [currentParams, pathname, router]
  )

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (trimmedQuery.length > 0 && trimmedQuery.length < 3) {
      return
    }

    const timeout = setTimeout(() => {
      if (trimmedQuery !== initialQuery || category !== initialCategory) {
        navigateWithFilters(trimmedQuery, category, 1)
      }
    }, 350)

    return () => clearTimeout(timeout)
  }, [query, category, initialQuery, initialCategory, navigateWithFilters])

  const {
    displayedArticles,
    hasMore,
    isLoadingMore,
    sentinelRef,
    appendSkeletonCount,
  } = useInfiniteArticles({
    initialArticles,
    initialPage,
    hasNextPage,
    initialTotal,
    query,
    category,
    order,
    pathname,
    isPending,
  })

  const handleClearFilters = useCallback(() => {
    setQuery("")
    setCategory("")

    if (initialQuery !== "" || initialCategory !== "") {
      navigateWithFilters("", "", 1)
    }
  }, [initialQuery, initialCategory, navigateWithFilters])

  return (
    <div>
      <ArticlesFiltersBar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        order={order}
        onOrderChange={setOrder}
        categories={categories}
      />

      <ArticlesResultsGrid
        isPending={isPending}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        articles={displayedArticles}
        sentinelRef={sentinelRef}
        appendSkeletonCount={appendSkeletonCount}
        query={query}
        category={category}
        onClearFilters={handleClearFilters}
      />
    </div>
  )
}
