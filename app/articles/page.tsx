import { Typography } from "@/components/ui/atoms/typography"
import { Metadata } from "next"
import ArticlesSearchViewWrapper from "@/components/search/ArticlesSearchViewWrapper"
import { Suspense } from "react"
import ArticlesLoadingState from "@/components/skeletons/ArticlesLoadingState"

interface ArticlesPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    order?: string
    page?: string
  }>
}

export const metadata: Metadata = {
  title: "Articles",
  description: "Search and filter the latest Vercel Daily stories.",
  openGraph: {
    title: "Vercel Daily News - Articles",
    description: "Search and filter the latest Vercel Daily stories.",
  },
}

export default function ArticlesPage({ searchParams }: ArticlesPageProps) {
  return (
    <div
      data-slot="articles-page"
      className="h-full w-full px-4 py-10 lg:mx-auto lg:max-w-4/5"
    >
      <section className="mb-5">
        <Typography as="h1" variant="h2" weight="bold">
          All Articles
        </Typography>
        <Typography variant="bodySm" className="text-muted-foreground">
          Latest updates from Vercel and Next.js ecosystem.
        </Typography>
      </section>
      <Suspense fallback={<ArticlesLoadingState />}>
        <ArticlesSearchViewWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
