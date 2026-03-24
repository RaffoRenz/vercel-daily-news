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
  name: CategoryType
  slug: string
}

enum CategoryType {
  CHANGELOG = "changelog",
  ENGINEERING = "engineering",
  CUSTOMERS = "customers",
  COMPANY_NEWS = "company-news",
  COMMUNITY = "community",
}

interface Article extends Metadata {
  title: string
  slug: string
  image: string
  tags: string[]
  author: Author
  category: CategoryType
  content: (
    | ({ type: ContentBlockType.PARAGRAPH } & TextBlock)
    | ({ type: ContentBlockType.HEADING } & HeadingBlock)
    | ({ type: ContentBlockType.BLOCKQUOTE } & BlockquoteBlock)
    | ({ type: ContentBlockType.UNORDERED_LIST } & ListBlock)
    | ({ type: ContentBlockType.ORDERED_LIST } & ListBlock)
    | ({ type: ContentBlockType.IMAGE } & ImageBlock)
  )[]
  excerpt: string
  featured: boolean
}

interface BreakingNews extends Metadata {
  articleId: string
  headline: string
  category: CategoryType
  summary: string
  urgent: boolean
}

export { CategoryType, ContentBlockType }

export type {
  Author,
  Article,
  BreakingNews,
  TextBlock,
  HeadingBlock,
  BlockquoteBlock,
  ListBlock,
  ImageBlock,
  ContentBlock,
}
