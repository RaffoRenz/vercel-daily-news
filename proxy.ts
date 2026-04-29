import { NextRequest, NextResponse } from "next/server"
import { SUBSCRIPTION_COOKIE } from "@/lib/constants"

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  const subscriptionToken = request.cookies.get(SUBSCRIPTION_COOKIE)?.value

  const isSubscribed = !!subscriptionToken
  response.headers.set("x-is-subscribed", isSubscribed ? "true" : "false")

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
