import { RichTextRenderer } from "@/components/rich-text-renderer"
import SubscribeCta from "@/components/subscriptions/SubscribeCta"
import { Article } from "@/models/articles.models"
import { getSubscriptionFromCookie } from "@/lib/services/subscription-session"

interface ArticleContentPaywallProps {
  content: Article["content"]
}

export default async function ArticleContentPaywall({
  content,
}: ArticleContentPaywallProps) {
  const subscription = await getSubscriptionFromCookie()
  const isSubscribed = subscription.isSubscribed

  return (
    <>
      <section className="mb-8">
        <div
          className={
            !isSubscribed ? "relative max-h-[50vh] overflow-hidden" : undefined
          }
        >
          <RichTextRenderer content={content} />
          {!isSubscribed ? (
            <div
              className="pointer-events-none absolute right-0 bottom-0 left-0 h-52 bg-linear-to-t from-background via-background/90 to-transparent"
              aria-hidden="true"
            />
          ) : null}
        </div>
      </section>

      {!isSubscribed ? (
        <section className="mb-10">
          <SubscribeCta description="This article is paywalled for non-subscribers. Subscribe to read the full content and access all premium articles." />
        </section>
      ) : null}
    </>
  )
}
