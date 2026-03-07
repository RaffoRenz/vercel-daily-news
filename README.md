# Next.js template

This is a Next.js template with shadcn/ui.

## Package Manager & Tooling

This repository uses **pnpm** as its package manager and relies on **Turbopack** for faster local development.

- Run `pnpm dev` to start the Next.js development server with turbopack.
- Before committing, `husky` and `lint-staged` will automatically format and lint your staged frontend files.

## Adding components

To add components to your app, run the following command:

```bash
pnpm dlx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```
