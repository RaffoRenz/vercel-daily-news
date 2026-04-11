"use client"

import { Input } from "@/components/ui/atoms/input"
import { Button } from "@/components/ui/atoms/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/atoms/select"
import { CategoryType } from "@/models/articles.models"
import { SearchIcon, XIcon } from "lucide-react"

interface CategoryOption {
  value: CategoryType
  label: string
}

interface ArticlesFiltersBarProps {
  query: string
  onQueryChange: (value: string) => void
  category: CategoryType | ""
  onCategoryChange: (value: CategoryType | "") => void
  order: "newest" | "oldest"
  onOrderChange: (value: "newest" | "oldest") => void
  categories: CategoryOption[]
}

const ALL_CATEGORIES = "all"

export default function ArticlesFiltersBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  order,
  onOrderChange,
  categories,
}: ArticlesFiltersBarProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-4">
      <div className="relative col-span-1 md:col-span-2">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search articles"
          className="h-10 cursor-text pr-10 pl-9"
          aria-label="Search articles"
        />

        {query ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="absolute top-1/2 right-2 -translate-y-1/2"
            onClick={() => onQueryChange("")}
            aria-label="Clear search"
          >
            <XIcon className="size-3.5" />
          </Button>
        ) : null}
      </div>

      <Select
        value={category || ALL_CATEGORIES}
        onValueChange={(value) =>
          onCategoryChange(
            value === ALL_CATEGORIES ? "" : (value as CategoryType)
          )
        }
      >
        <SelectTrigger
          className="col-span-1 w-full cursor-pointer"
          aria-label="Filter by category"
          size="default"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_CATEGORIES}>All categories</SelectItem>
          {categories.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={order}
        onValueChange={(value) => onOrderChange(value as "newest" | "oldest")}
      >
        <SelectTrigger
          className="col-span-1 w-full cursor-pointer"
          aria-label="Order by publish date"
          size="default"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest first</SelectItem>
          <SelectItem value="oldest">Oldest first</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
