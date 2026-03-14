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
  //   const post = await getPost(params.slug)

  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 128,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* {post.title} */}
    </div>
  )
}
