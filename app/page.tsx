import BreakingNewsBanner from "@/components/BreakingNewsBanner"

export default function Page() {
  return (
    <div
      data-slot="homepage"
      className="w-full px-4 py-2 lg:mx-auto lg:max-w-[1440px]"
    >
      <BreakingNewsBanner />
    </div>
  )
}
