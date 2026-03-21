"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { Button } from "../components/ui/atoms/button"
import { MoonIcon, SunIcon } from "lucide-react"

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  return (
    <Button
      size="icon-lg"
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} theme (current: ${typeof window === "undefined" ? "light" : resolvedTheme})`}
    >
      {resolvedTheme === "light" ? (
        <MoonIcon strokeWidth={1.5} />
      ) : (
        <SunIcon strokeWidth={1.5} />
      )}
    </Button>
  )
}

export { ThemeProvider }
