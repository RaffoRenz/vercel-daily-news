import { Geist_Mono, Noto_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { cn } from "@/lib/utils"
import Header from "@/components/header/Header"
import Footer from "@/components/footer"
import { Metadata } from "next"
import { Suspense } from "react"
import { AppShellDynamic } from "@/components/common/AppShellDynamic"

const notoSans = Noto_Sans({ variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: { template: "Vercel Daily News - %s", default: "Vercel Daily News" },
  description: "Your daily dose of Vercel news and updates.",
}

export default function RootLayout({
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
      <body>
        <ThemeProvider>
          <Header />
          <Suspense fallback={null}>
            <AppShellDynamic>{children}</AppShellDynamic>
          </Suspense>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
