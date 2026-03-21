import clsx from "clsx"

type TypographyAs = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

interface TypographyProps {
  as?: TypographyAs
  variant?: keyof typeof VARIANTS
  weight?: keyof typeof WEIGHTS
  align?: keyof typeof ALIGNMENTS
  truncate?: boolean
  className?: string
}

const VARIANTS = {
  h1: "text-4xl leading-10",
  h2: "text-3xl leading-9",
  h3: "text-2xl leading-8",
  h4: "text-xl leading-7",
  h5: "text-lg leading-6",
  h6: "text-base leading-5",
  body: "text-base leading-4",
  bodySm: "text-sm leading-4",
  caption: "text-xs leading-3",
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

export const Typography = ({
  as,
  variant = "body",
  weight,
  align = "left",
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
        truncate && "truncate",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Typography
