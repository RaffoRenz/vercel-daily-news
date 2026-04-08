import "./globals.css"

import { Geist_Mono, Noto_Sans } from "next/font/google"
import { ThemeProvider } from "@/providers/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { cn } from "@/lib/utils"
import Header from "@/components/header/Header"
import Footer from "@/components/footer"
import { Metadata } from "next"
import BreakingNewsBanner from "@/components/breaking-news"
import { Skeleton } from "@/components/ui/atoms/skeleton"
import { Suspense } from "react"

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: { template: "Vercel Daily News - %s", default: "Vercel Daily News" },
  description: "Your daily dose of Vercel news and updates.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        notoSans.variable
      )}
    >
      <head></head>
      <body>
        <ThemeProvider>
          <Header />
          <Suspense fallback={<Skeleton className="h-9 w-full bg-gray-100" />}>
            <BreakingNewsBanner />
          </Suspense>
          <main className="h-full min-h-svh w-full">{children}</main>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
