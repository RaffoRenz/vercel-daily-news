import clsx from "clsx"
import { RENDERERS } from "./renderFactory"
import { AnyBlock, BlockMap } from "./rich-text-renderer.types"
import { ContentBlockType } from "@/models/articles.models"

interface RendererProps {
  content: AnyBlock[]
  className?: string
}

function renderBlock<K extends ContentBlockType>(
  block: { type: K } & BlockMap[K],
  key: number
) {
  const Component = RENDERERS[block.type as keyof typeof RENDERERS]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Component key={key} {...(block as any)} />
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
