import { getBreakingNews } from "@/lib/services/articles/getBreakingNews"
import { BreakingNewsClient } from "./BreakingNewsClient"

export default async function BreakingNewsBanner() {
  const breakingNewsContent = await getBreakingNews()

  if (!breakingNewsContent) return null

  return <BreakingNewsClient breakingNewsContent={breakingNewsContent} />
}
