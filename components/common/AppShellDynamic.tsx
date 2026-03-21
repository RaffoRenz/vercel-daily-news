import { DeviceType, ViewportProvider } from "@/providers/viewport-provider"
import { headers } from "next/headers"
import BreakingNewsBanner from "../BreakingNewsBanner"

export const AppShellDynamic: React.FC<React.PropsWithChildren> = async ({
  children,
}) => {
  const headersList = await headers()
  const viewport = headersList.get("X-viewport")
  return (
    <ViewportProvider device={viewport as DeviceType}>
      <BreakingNewsBanner />
      <main className="h-full min-h-svh w-full">{children}</main>
    </ViewportProvider>
  )
}
