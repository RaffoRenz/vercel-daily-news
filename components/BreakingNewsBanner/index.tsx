import { getBreakingNews } from "@/lib/services/articles/getBreakingNews"
import { BreakingNewsClient } from "./BreakingNewsClient"
import { cacheLife, cacheTag } from "next/cache"

export default async function BreakingNewsBanner() {
  "use cache"
  cacheTag("breaking-news-banner")
  cacheLife("minutes")
  const breakingNewsContent = await getBreakingNews()

  if (!breakingNewsContent) return null

  return <BreakingNewsClient breakingNewsContent={breakingNewsContent} />
}
