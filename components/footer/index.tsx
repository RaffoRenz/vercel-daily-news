import { Suspense } from "react"
import FooterDynamicContent from "./FooterDynamicContent"

export default function Footer() {
  return (
    <footer className="flex h-16 w-full items-center justify-center border-t">
      <Suspense>
        <FooterDynamicContent />
      </Suspense>
    </footer>
  )
}
