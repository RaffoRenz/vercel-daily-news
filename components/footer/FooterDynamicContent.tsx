import { Typography } from "../ui/atoms/typography"

export default async function FooterDynamicContent() {
  "use cache"

  return (
    <Typography
      variant="bodySm"
      weight="semibold"
      align="center"
      className="text-primary-500"
    >
      © {new Date().getFullYear()} Vercel Daily News. All rights reserved.
    </Typography>
  )
}
