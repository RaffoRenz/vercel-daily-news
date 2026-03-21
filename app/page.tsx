import HeroBanner from "@/components/HeroBanner"

export default function Page() {
  return (
    <div data-slot="homepage" className="w-full">
      <HeroBanner />
    </div>
  )
}
