import clsx from "clsx"
import { RENDERERS } from "./renderFactory"
import { AnyBlock } from "./rich-text-renderer.types"
import { ContentBlockType } from "@/models/articles.models"

interface RendererProps {
  content: AnyBlock[]
  className?: string
}

function renderBlock(block: AnyBlock, key: number) {
  switch (block.type) {
    case ContentBlockType.PARAGRAPH: {
      const ParagraphRenderer = RENDERERS[ContentBlockType.PARAGRAPH]
      return <ParagraphRenderer key={key} text={block.text} />
    }
    case ContentBlockType.HEADING: {
      const HeadingRenderer = RENDERERS[ContentBlockType.HEADING]
      return <HeadingRenderer key={key} text={block.text} level={block.level} />
    }
    case ContentBlockType.BLOCKQUOTE: {
      const BlockquoteRenderer = RENDERERS[ContentBlockType.BLOCKQUOTE]
      return <BlockquoteRenderer key={key} text={block.text} />
    }
    case ContentBlockType.UNORDERED_LIST: {
      const UnorderedListRenderer = RENDERERS[ContentBlockType.UNORDERED_LIST]
      return <UnorderedListRenderer key={key} items={block.items} />
    }
    case ContentBlockType.ORDERED_LIST: {
      const OrderedListRenderer = RENDERERS[ContentBlockType.ORDERED_LIST]
      return <OrderedListRenderer key={key} items={block.items} />
    }
    case ContentBlockType.IMAGE: {
      const ImageRenderer = RENDERERS[ContentBlockType.IMAGE]
      if (!block.src) return null
      return (
        <ImageRenderer
          key={key}
          src={block.src}
          alt={block.alt}
          caption={block.caption}
        />
      )
    }
    default:
      return null
  }
}

export const RichTextRenderer: React.FC<RendererProps> = ({
  content,
  className,
}) => {
  return (
    <div className={clsx("space-y-5", className)}>
      {content.map((block, i) => renderBlock(block, i))}
    </div>
  )
}
