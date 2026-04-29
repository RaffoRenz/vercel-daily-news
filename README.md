# Vercel Daily News

A modern news platform built with Next.js and React, featuring a subscription-based paywall system. Browse, search, and read daily news articles with a seamless user experience.

## Project Overview

**Vercel Daily News** is a contemporary news application that demonstrates modern web development practices with Next.js 16.x. It provides users with access to daily news articles with a subscription model that unlocks premium content and features.

## Key Features

- **Article Management**: Browse, search, and filter news articles by category
- **Subscription System**: Subscription-based paywall for premium article access based on nextjs proxy
- **Caching Strategy**: Optimized with Next.js Cache Components for performance
- **Responsive Design**: Tailwind CSS and shadcn/ui components
- **Advanced Search**: Full-text search with category filtering and pagination
- **Breaking News**: Real-time breaking news alerts and updates with a less cacheLife
- **Trending Articles**: Trending articles section for popular content
- **Rich Media**: Image optimization with Next.js Image and remote pattern support
- **Dark Mode**: Theme switcher for light/dark mode preference
- **Accessibility**: WCAG compliant with proper ARIA labels and semantic HTML
- **Toast Notifications**: User feedback with Sonner toast notifications
- **SEO Optimized**: Dynamic metadata, Open Graph tags

## Tech Stack

- **Framework**: Next.js 16.x with App Router
- **UI Components**: shadcn/ui + Tailwind CSS
- **Authentication**: Server Actions with cookie-based sessions
- **Notifications**: Sonner
- **Theme**: next-themes
- **Icons**: lucide-react
- **Code Quality**: ESLint, Prettier, Husky

## Package Manager & Tooling

This repository uses **pnpm** as its package manager;

- Run `pnpm dev` to start the Next.js development server with turbopack.
- Before committing, `husky` and `lint-staged` will automatically format and lint your staged frontend files.

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
app/
├── actions/              # Server actions (subscription, auth)
├── articles/             # Article pages and layouts
└── page.tsx              # Homepage

components/
├── articles/             # Article components
├── breaking-news/        # Breaking news widget
├── featured-news/        # Featured articles section
├── header/              # Navigation header
├── search/              # Search and filter components
├── subscriptions/       # Subscription UI
├── ui/atoms/            # Reusable UI components
└── ...

lib/
├── api-client.ts        # API communication
├── services/            # Business logic services
└── models/              # TypeScript types

hooks/                   # Custom React hooks
models/                  # Data models
providers/               # Context providers
```

## Key Architecture Decisions

- **Proxy**: Subscription status check via HTTP headers (not cookies directly)
- **Paywall Logic**: Server-side rendering with client-side awareness
- **Caching**: Next.js Cache Components with stale-while-revalidate strategy
- **Actions**: Server Actions for secure subscription management

## Adding Components

To add components to your app, run the following command:

```bash
pnpm dlx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using Components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/atoms/button"
```
