import VercelLogo from "@/components/VercelLogo"
import NavigationMenu from "@/components/organisms/NavigationMenu"

export default function Header() {
  return (
    <header className="sticky inset-0 z-50 flex h-(--header-mobile-height) w-full items-center justify-between px-4 py-2 lg:h-(--header-desktop-height)">
      <div className="flex h-full w-3/4 gap-10" data-slot="navigation-menu">
        <VercelLogo />
        <NavigationMenu />
      </div>
      <div data-slot="navigation-actions" className="h-full w-1/4"></div>
    </header>
  )
}
