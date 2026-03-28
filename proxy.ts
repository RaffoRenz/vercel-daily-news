import { NextRequest, NextResponse } from "next/server"
import { SUBSCRIPTION_COOKIE } from "@/lib/constants"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isArticleDetailRoute =
    pathname.startsWith("/articles/") && pathname.split("/").length === 3

  if (!isArticleDetailRoute) {
    return NextResponse.next()
  }

  const hasSubscriptionToken = Boolean(
    request.cookies.get(SUBSCRIPTION_COOKIE)?.value
  )

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(
    "x-paywall-mode",
    hasSubscriptionToken ? "full-access" : "teaser"
  )

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ["/articles/:path*"],
}
