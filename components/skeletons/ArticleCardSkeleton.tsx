import { Skeleton } from "@/components/ui/atoms/skeleton"

export default function ArticleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Skeleton className="h-44 w-full sm:h-48 lg:h-44 xl:h-48" />
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-1/3 pt-1" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="ml-auto h-4 w-20" />
      </div>
    </div>
  )
}
