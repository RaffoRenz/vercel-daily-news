import {
  BlockquoteBlock,
  ContentBlockType,
  HeadingBlock,
  ImageBlock,
  ListBlock,
  TextBlock,
} from "@/models/articles.models"

export type BlockMap = {
  [ContentBlockType.PARAGRAPH]: TextBlock
  [ContentBlockType.HEADING]: HeadingBlock
  [ContentBlockType.BLOCKQUOTE]: BlockquoteBlock
  [ContentBlockType.UNORDERED_LIST]: ListBlock
  [ContentBlockType.ORDERED_LIST]: ListBlock
  [ContentBlockType.IMAGE]: ImageBlock
}

export type AnyBlock = {
  [K in keyof BlockMap]: { type: K } & BlockMap[K]
}[keyof BlockMap]
