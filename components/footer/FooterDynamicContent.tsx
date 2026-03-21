"use client"
import Typography from "../ui/atoms/typography"

export default function FooterDynamicContent() {
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
