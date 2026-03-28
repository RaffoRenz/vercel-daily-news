/* eslint-disable @next/next/no-img-element */

import { getArticleDetails } from "@/lib/services/articles/getArticleDetails"
import { ImageResponse } from "next/og"

// Image metadata
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

interface ImageGeneratorProps {
  params: Promise<{ slug: string }>
}

// Image generation
export default async function Image({ params }: ImageGeneratorProps) {
  const { slug } = await params
  const article = await getArticleDetails(slug)

  const title = article?.title || "Vercel Daily News"
  const imageUrl = article?.image

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#0f172a",
        color: "#ffffff",
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 0.2))",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 16,
          width: "100%",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            opacity: 0.95,
          }}
        >
          Vercel Daily News
        </div>
        <div
          style={{
            fontSize: 52,
            lineHeight: 1.1,
            fontWeight: 800,
            maxWidth: "92%",
          }}
        >
          {title}
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  )
}
