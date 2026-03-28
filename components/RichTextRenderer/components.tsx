import ReactMarkdown from "react-markdown"
import { Typography } from "../ui/atoms/typography"
import Link from "next/link"
import Image from "next/image"
import {
  BlockquoteBlock,
  HeadingBlock,
  ImageBlock,
  ListBlock,
  TextBlock,
} from "@/models/articles.models"
import { Button } from "../ui/atoms/button"

const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <Typography variant="body" lineHeight="1.6">
            {children}
          </Typography>
        ),
        strong: ({ children }) => (
          <Typography as="strong" variant="body" weight="bold">
            {children}
          </Typography>
        ),
        a: ({ href, children }) => (
          <Button
            variant="link"
            size="lg"
            nativeButton={false}
            className="px-0 leading-[1.6]"
            render={
              <Link
                href={href || "#"}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            {children}
          </Button>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

const Paragraph = ({ text }: TextBlock) => {
  return <Markdown>{text}</Markdown>
}

const headingVariantMap = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const

const Heading = ({ text, level }: HeadingBlock) => {
  const safeLevel = Math.min(Math.max(level, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6

  return (
    <Typography
      as={`h${safeLevel}`}
      variant={headingVariantMap[safeLevel]}
      weight="semibold"
    >
      <ReactMarkdown>{text}</ReactMarkdown>
    </Typography>
  )
}

const Blockquote = ({ text }: BlockquoteBlock) => (
  <blockquote className="border-l-4 pl-4 text-gray-600 italic">
    <Markdown>{text}</Markdown>
  </blockquote>
)

const UnorderedList = ({ items }: ListBlock) => (
  <ul className="list-disc space-y-2 pl-5">
    {items.map((item, i) => (
      <li key={i}>
        <Markdown>{item}</Markdown>
      </li>
    ))}
  </ul>
)

const OrderedList = ({ items }: ListBlock) => (
  <ol className="list-decimal space-y-2 pl-5">
    {items.map((item, i) => (
      <li key={i}>
        <Markdown>{item}</Markdown>
      </li>
    ))}
  </ol>
)

const ImageBlockComponent = ({ src, alt, caption }: ImageBlock) => {
  return (
    <figure className="space-y-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-cover"
          unoptimized
        />
      </div>
      {caption && (
        <figcaption>
          <Typography variant="caption" align="center">
            {caption}
          </Typography>
        </figcaption>
      )}
    </figure>
  )
}

export {
  Markdown,
  Paragraph,
  Heading,
  Blockquote,
  UnorderedList,
  OrderedList,
  ImageBlockComponent,
}
