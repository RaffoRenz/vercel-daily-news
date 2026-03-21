import VercelLogo from "@/components/VercelLogo"
import NavigationMenu from "@/components/header/NavigationMenu"
import { ThemeSwitcher } from "@/providers/theme-provider"
import SubscriptionStatus from "@/components/common/SubscriptionStatus"
import PopoverNavigationMenu from "@/components/header/PopoverNavigationMenu"
import Link from "next/link"

const Header: React.FC = () => {
  return (
    <header className="sticky inset-0 z-20 h-(--header-mobile-height) w-full border-b border-b-chart-1 bg-background px-4 py-2 lg:h-(--header-desktop-height)">
      <div className="relative flex h-full w-full items-center justify-between">
        <section className="hidden md:block">
          <NavigationMenu />
        </section>
        <section className="block md:hidden">
          <PopoverNavigationMenu />
        </section>
        <section className="absolute top-0 left-1/2 h-full w-fit -translate-x-1/2">
          <Link href="/" prefetch={false} scroll={false}>
            <VercelLogo />
          </Link>
        </section>
        <div
          data-slot="navigation-actions"
          className="flex h-full w-fit items-center gap-4"
        >
          <SubscriptionStatus />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}

export default Header
