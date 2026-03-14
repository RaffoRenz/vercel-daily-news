export default function Footer() {
  return (
    <footer className="flex h-16 w-full items-center justify-center border-t">
      <p className="text-xs text-muted-foreground md:text-sm">
        &copy; {new Date().getFullYear()} Vercel Daily News. All rights
        reserved.
      </p>
    </footer>
  )
}
