import { ContentBlockType } from "@/models/articles.models"
import {
  Paragraph,
  Heading,
  UnorderedList,
  OrderedList,
  Blockquote,
  ImageBlockComponent,
} from "./components"
import { BlockMap } from "./rich-text-renderer.types"

type RendererMap = {
  [K in ContentBlockType]: React.FC<BlockMap[K]>
}

const RENDERERS = {
  [ContentBlockType.PARAGRAPH]: Paragraph,
  [ContentBlockType.HEADING]: Heading,
  [ContentBlockType.BLOCKQUOTE]: Blockquote,
  [ContentBlockType.UNORDERED_LIST]: UnorderedList,
  [ContentBlockType.ORDERED_LIST]: OrderedList,
  [ContentBlockType.IMAGE]: ImageBlockComponent,
} satisfies RendererMap

export { RENDERERS }
