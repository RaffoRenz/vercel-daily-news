import clsx from "clsx"

type TypographyAs = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type LineHeight =
  | "1.2"
  | "1.3"
  | "1.4"
  | "1.5"
  | "1.6"
  | "1.7"
  | "1.8"
  | "1.9"
  | "2.0"

interface TypographyProps {
  as?: TypographyAs
  variant?: keyof typeof VARIANTS
  weight?: keyof typeof WEIGHTS
  align?: keyof typeof ALIGNMENTS
  lineHeight?: LineHeight
  truncate?: boolean
  className?: string
}

const VARIANTS = {
  h1: "text-4xl",
  h2: "text-3xl",
  h3: "text-2xl",
  h4: "text-xl",
  h5: "text-lg",
  h6: "text-base",
  body: "text-base",
  bodySm: "text-sm",
  caption: "text-xs",
  overline: "text-xs uppercase tracking-wide",
}

const WEIGHTS = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
}

const ALIGNMENTS = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
}

const LINE_HEIGHTS: Record<LineHeight, string> = {
  "1.2": "leading-[1.2]",
  "1.3": "leading-[1.3]",
  "1.4": "leading-[1.4]",
  "1.5": "leading-[1.5]",
  "1.6": "leading-[1.6]",
  "1.7": "leading-[1.7]",
  "1.8": "leading-[1.8]",
  "1.9": "leading-[1.9]",
  "2.0": "leading-[2.0]",
}

export const Typography = ({
  as,
  variant = "body",
  weight,
  align = "left",
  lineHeight,
  truncate = false,
  className,
  children,
  ...props
}: React.PropsWithChildren<TypographyProps>) => {
  const Component = as || "p"

  return (
    <Component
      className={clsx(
        VARIANTS[variant],
        weight && WEIGHTS[weight],
        ALIGNMENTS[align],
        LINE_HEIGHTS[lineHeight || "1.5"],
        truncate && "truncate",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
