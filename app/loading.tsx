import { Spinner } from "@/components/ui/atoms/spinner"

export default function LoadingState() {
  return (
    <div className="flex h-full min-h-150 w-full items-center justify-center">
      <Spinner />
    </div>
  )
}
