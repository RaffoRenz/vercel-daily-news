import ArticleCardSkeleton from "@/components/articles/ArticleCardSkeleton"
import { Skeleton } from "@/components/ui/atoms/skeleton"

export default function ArticlesLoadingState() {
  return (
    <div aria-hidden="true">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="w-full md:max-w-md">
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-10 w-full md:w-44" />
        <Skeleton className="h-10 w-full md:w-40" />
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ArticleCardSkeleton key={`articles-loading-card-${index}`} />
        ))}
      </div>
    </div>
  )
}
