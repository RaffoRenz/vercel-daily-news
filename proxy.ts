import { NextRequest, NextResponse, userAgent } from "next/server"

export function proxy(request: NextRequest) {
  const { device } = userAgent({ headers: request.headers })
  const viewport = device.type || "desktop"
  const response = NextResponse.next()
  response.headers.set("X-Viewport", viewport)
  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|public|images|fonts|.well-known|.appspecific|favicon.ico).*)",
  ],
}
