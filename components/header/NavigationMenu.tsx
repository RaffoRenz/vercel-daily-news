import { Button } from "@/components/ui/atoms/button"
import Link from "next/link"

const NavigationMenu = () => {
  return (
    <nav className="flex h-full w-full items-center justify-start gap-4">
      <Button
        variant="link"
        size="lg"
        nativeButton={false}
        render={<Link href="/articles" prefetch />}
      >
        Articles
      </Button>
    </nav>
  )
}

export default NavigationMenu
