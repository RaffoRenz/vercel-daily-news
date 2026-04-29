import ArticleCardSkeleton from "@/components/skeletons/ArticleCardSkeleton"
import { Skeleton } from "@/components/ui/atoms/skeleton"
import { cn } from "@/lib/utils"

export default function ArticlesLoadingState({
  isFeatured = false,
}: {
  isFeatured?: boolean
}) {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full px-4 py-10 lg:mx-auto lg:max-w-4/5"
    >
      <div
        className={cn(
          "mb-6 flex flex-col md:flex-row md:items-center",
          isFeatured ? "justify-between" : "gap-3"
        )}
      >
        <div className="w-full md:max-w-md">
          <Skeleton className="h-10 w-full" />
        </div>

        {!isFeatured && <Skeleton className="h-10 w-full md:w-44" />}
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
