import { Button } from "@/components/ui/atoms/button"
import Link from "next/link"

const NavigationMenu = () => {
  return (
    <nav className="flex h-full w-full items-center justify-start">
      <ul className="flex items-center gap-4">
        <li>
          <Button
            variant="link"
            size="lg"
            nativeButton={false}
            render={<Link href="/" prefetch />}
          >
            Home
          </Button>
        </li>
        <li>
          <Button
            variant="link"
            size="lg"
            nativeButton={false}
            render={<Link href="/articles" prefetch />}
          >
            Articles
          </Button>
        </li>
        <li>
          <Button
            variant="link"
            size="lg"
            nativeButton={false}
            render={<Link href="/search" />}
          >
            Search
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationMenu
