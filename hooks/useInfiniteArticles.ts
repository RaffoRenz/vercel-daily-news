"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"

import { getArticles } from "@/lib/services/articles/getArticles"
import { Article, CategoryType } from "@/models/articles.models"
import { PAGE_SIZE } from "@/lib/constants"

interface UseInfiniteArticlesParams {
  initialArticles: Article[]
  initialPage: number
  hasNextPage: boolean
  initialTotal?: number
  query: string
  category: CategoryType | ""
  order: "newest" | "oldest"
  pathname: string
  isPending: boolean
}
export function useInfiniteArticles({
  initialArticles,
  initialPage,
  hasNextPage,
  initialTotal,
  query,
  category,
  order,
  pathname,
  isPending,
}: UseInfiniteArticlesParams) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [hasMore, setHasMore] = useState(hasNextPage)
  const [totalArticles, setTotalArticles] = useState<number | undefined>(
    initialTotal
  )
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const currentSearchParams = useSearchParams()

  useEffect(() => {
    setArticles(initialArticles)
    setCurrentPage(initialPage)
    setHasMore(hasNextPage)
    setTotalArticles(initialTotal)
  }, [initialArticles, initialPage, hasNextPage, initialTotal])

  const sortByOrder = useCallback(
    (input: Article[]) => {
      return [...input].sort((a, b) => {
        const timestampA = new Date(a.publishedAt).getTime()
        const timestampB = new Date(b.publishedAt).getTime()
        return order === "oldest"
          ? timestampA - timestampB
          : timestampB - timestampA
      })
    },
    [order]
  )

  const displayedArticles = useMemo(
    () => sortByOrder(articles),
    [articles, sortByOrder]
  )
  const remainingArticlesCount = useMemo(() => {
    if (totalArticles === undefined) {
      return undefined
    }

    return Math.max(totalArticles - articles.length, 0)
  }, [totalArticles, articles.length])

  const appendSkeletonCount = useMemo(() => {
    if (remainingArticlesCount === undefined) {
      return PAGE_SIZE
    }

    return Math.max(1, Math.min(PAGE_SIZE, remainingArticlesCount))
  }, [remainingArticlesCount])

  const syncPageInUrl = useCallback(
    (nextPage: number) => {
      const params = new URLSearchParams(currentSearchParams.toString())
      if (nextPage > 1) {
        params.set("page", String(nextPage))
      } else {
        params.delete("page")
      }
      const queryString = params.toString()
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname
      window.history.replaceState(window.history.state, "", nextUrl)
    },
    [currentSearchParams, pathname]
  )

  const loadMoreArticles = useCallback(async () => {
    if (isLoadingMore || !hasMore || isPending) return

    setIsLoadingMore(true)

    const nextPage = currentPage + 1
    const normalizedQuery = query.trim()

    try {
      const nextData = await getArticles({
        page: nextPage,
        limit: PAGE_SIZE,
        ...(normalizedQuery ? { search: normalizedQuery } : {}),
        ...(category ? { category } : {}),
        featured: false,
      })

      const nextArticles = nextData.articles || []
      setArticles((prev) => {
        const seenIds = new Set(prev.map((article) => article.id))
        const merged = [...prev]

        for (const article of nextArticles) {
          if (!seenIds.has(article.id)) {
            seenIds.add(article.id)
            merged.push(article)
          }
        }

        return merged
      })
      setCurrentPage(nextPage)
      setTotalArticles(nextData.meta?.total ?? totalArticles)
      setHasMore(
        nextData.meta?.hasNextPage ?? nextArticles.length === PAGE_SIZE
      )
      syncPageInUrl(nextPage)
    } catch (error) {
      console.error("Error while loading more articles:", error)
      setHasMore(false)
    } finally {
      setIsLoadingMore(false)
    }
  }, [
    category,
    currentPage,
    hasMore,
    isLoadingMore,
    isPending,
    query,
    syncPageInUrl,
    totalArticles,
  ])

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          void loadMoreArticles()
        }
      },
      {
        root: null,
        rootMargin: "320px 0px",
        threshold: 0.25,
      }
    )

    observer.observe(sentinelRef.current)

    return () => {
      observer.disconnect()
    }
  }, [hasMore, loadMoreArticles])

  useEffect(() => {
    syncPageInUrl(initialPage)
  }, [initialPage, syncPageInUrl])

  return {
    displayedArticles,
    hasMore,
    isLoadingMore,
    sentinelRef,
    appendSkeletonCount,
  }
}
