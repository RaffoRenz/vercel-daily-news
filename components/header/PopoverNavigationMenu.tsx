import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/atoms/popover"
import { Button } from "../ui/atoms/button"
import { Menu } from "lucide-react"
import Link from "next/link"

const PopoverNavigationMenu: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger
        value="Menu"
        render={
          <Button size="icon-lg" variant="secondary">
            <Menu strokeWidth={1.5} />
          </Button>
        }
      ></PopoverTrigger>
      <PopoverContent>
        <nav className="flex h-full w-full items-center justify-start">
          <ul>
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
      </PopoverContent>
    </Popover>
  )
}

export default PopoverNavigationMenu
