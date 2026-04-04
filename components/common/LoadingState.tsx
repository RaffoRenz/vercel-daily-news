import { Spinner } from "@/components/ui/atoms/spinner"
import { Typography } from "@/components/ui/atoms/typography"
import React from "react"

interface LoadingStateProps {
  loadingLabel: string
}

const LoadingState: React.FC<LoadingStateProps> = ({ loadingLabel }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 px-4 text-center">
      <Spinner className="size-6" />
      <Typography variant="h4" className="text-muted-foreground">
        {loadingLabel}
      </Typography>
    </div>
  )
}

export default LoadingState
