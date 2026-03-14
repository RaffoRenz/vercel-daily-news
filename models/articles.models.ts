enum ContentBlockType {
  PARAGRAPH = "paragraph",
  HEADING = "heading",
  BLOCKQUOTE = "blockquote",
  IMAGE = "image",
  UNORDERED_LIST = "unordered-list",
  ORDERED_LIST = "ordered-list",
}

type TextBlock = {
  text: string
}

type HeadingBlock = TextBlock & {
  level: number
}

type BlockquoteBlock = TextBlock

type ListBlock = {
  items: string[]
}

type ImageBlock = {
  alt: string
  src: string
  caption?: string
}

type ContentBlock<T> = {
  type: ContentBlockType
} & T

interface Metadata {
  id: string
  publishedAt: string
}

interface Author {
  avatar: string
  name: string
}

interface Category {
  articleCount: number
  name: string
  slug: string
}

interface Article extends Metadata {
  title: string
  slug: string
  image: string
  tags: string[]
  author: Author
  category: Category
  content: ContentBlock<
    TextBlock | HeadingBlock | BlockquoteBlock | ListBlock | ImageBlock
  >[]
  excerpt: string
  featured: boolean
}

interface BreakingNews extends Metadata {
  articleId: string
  headline: string
  category: string
  summary: string
  urgent: boolean
}

export type {
  Author,
  Article,
  BreakingNews,
  ContentBlockType,
  TextBlock,
  HeadingBlock,
  BlockquoteBlock,
  ListBlock,
  ImageBlock,
  ContentBlock,
}
