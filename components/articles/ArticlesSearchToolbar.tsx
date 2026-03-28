"use client"

import { Input } from "@/components/ui/atoms/input"
import { CategoryType } from "@/models/articles.models"
import { SearchIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"

interface ArticlesSearchToolbarProps {
  initialQuery: string
  initialCategory: CategoryType | ""
  initialOrder: "newest" | "oldest"
}

export default function ArticlesSearchToolbar({
  initialQuery,
  initialCategory,
  initialOrder,
}: ArticlesSearchToolbarProps) {
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
    (
      nextQuery: string,
      nextCategory: CategoryType | "",
      nextOrder: "newest" | "oldest"
    ) => {
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

      if (nextOrder !== "newest") {
        params.set("order", nextOrder)
      } else {
        params.delete("order")
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
      if (
        trimmedQuery !== initialQuery ||
        category !== initialCategory ||
        order !== initialOrder
      ) {
        navigateWithFilters(trimmedQuery, category, order)
      }
    }, 350)

    return () => clearTimeout(timeout)
  }, [
    query,
    category,
    order,
    initialQuery,
    initialCategory,
    initialOrder,
    navigateWithFilters,
  ])

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative w-full md:max-w-md">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
            className="pl-8"
            aria-label="Search articles"
          />
        </div>
        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as CategoryType | "")
          }
          aria-label="Filter by category"
          className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <select
          value={order}
          onChange={(event) =>
            setOrder(event.target.value as "newest" | "oldest")
          }
          aria-label="Order by publish date"
          className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="mt-3 min-h-5" aria-live="polite">
        {isPending ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-muted" />
            <span className="text-xs">Searching articles...</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
