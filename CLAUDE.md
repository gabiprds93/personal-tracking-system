# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Personal Tracking System** - a Next.js application for tracking habits, goals, and personal metrics with gamification elements. The project structure includes:

- **`frontend/`** - Main Next.js application with shadcn/ui components and theme support
- **`backend/`** - Currently empty (placeholder for future backend functionality)

## Commands

### Frontend Application (`frontend/`)
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

Note: The frontend uses both npm (package-lock.json) and pnpm (pnpm-lock.yaml) lock files.

## Architecture

### Frontend Application (`frontend/`)
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Language**: TypeScript 5
- **UI Library**: Complete shadcn/ui component library
- **Theme**: Dark/light mode support with next-themes
- **Icons**: Lucide React
- **Fonts**: Geist and Manrope with Next.js font optimization

### Key Architectural Patterns
- **Component Library**: Full shadcn/ui implementation in `components/ui/`
- **Theme System**: Dark/light mode theming with `ThemeProvider` wrapper
- **Utility Functions**: Tailwind class merging utilities in `lib/utils.ts` using clsx and tailwind-merge
- **Page Structure**: App Router pages in `app/` directory
- **Responsive Design**: Mobile-first responsive design patterns

## Application Features

### Pages and Routes
- **`/`** (app/page.tsx) - Main dashboard with habit tracking, progress metrics, and gamification
- **`/habits`** (app/habits/page.tsx) - Habits management page
- **`/goals`** (app/goals/page.tsx) - Goals tracking page  
- **`/analytics`** (app/analytics/page.tsx) - Analytics and progress visualization
- **`/profile`** (app/profile/page.tsx) - User profile and achievements

### Core Components
- **`theme-provider.tsx`** - Next-themes wrapper for dark/light mode support
- **`components/ui/`** - Complete shadcn/ui component library including:
  - Cards, buttons, forms, dialogs, navigation components
  - Charts (using recharts), tables, data display components
  - Input components, overlays, and feedback components

### Application Patterns
- **Gamification**: Points system, streaks, achievements, and motivational messaging
- **Real-time UI**: Celebration animations and progress feedback
- **Theme Support**: System-aware dark/light mode with smooth transitions
- **Mock Data**: Currently uses static data for demonstration purposes

## Development Patterns

### Component Conventions
- Use TypeScript for all components with strict typing
- Client components marked with `'use client'` directive
- Component props typed with interfaces
- Use shadcn/ui components for consistent UI patterns
- Leverage `cn()` utility from `lib/utils.ts` for conditional styling

### Styling Approach
- **Tailwind CSS 4**: Modern Tailwind with latest features
- **shadcn/ui**: Pre-built, accessible component library
- **Responsive Design**: Mobile-first approach with responsive utilities
- **Theme Variables**: CSS custom properties for consistent theming
- **Class Merging**: Use `cn()` utility for conditional classes

### File Organization
```
frontend/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Dashboard (main page)
│   ├── layout.tsx    # Root layout with theme provider
│   ├── globals.css   # Global styles and Tailwind imports
│   ├── habits/       # Habits management pages
│   ├── goals/        # Goals tracking pages
│   ├── analytics/    # Analytics and charts pages
│   └── profile/      # User profile and achievements
├── components/       # React components
│   ├── theme-provider.tsx  # Theme context wrapper
│   └── ui/           # shadcn/ui component library
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
│   └── utils.ts      # Class merging and helpers
└── styles/           # Additional CSS files
```

## Working with This Codebase

### Adding New Pages
1. Create new page in `app/` directory following App Router conventions
2. Use existing shadcn/ui components for consistent UI
3. Implement responsive design with Tailwind utilities
4. Add loading states using `loading.tsx` files

### Component Development
- Import and use shadcn/ui components from `@/components/ui/`
- Use `useTheme` from next-themes for theme-aware components
- Leverage Lucide React icons for consistent iconography
- Follow accessibility best practices provided by shadcn/ui

### Styling Guidelines
- Use Tailwind's design system variables for spacing and colors
- Apply responsive design with `sm:`, `md:`, `lg:` prefixes
- Use `cn()` utility for conditional styling: `cn("base-class", condition && "conditional-class")`
- Leverage CSS custom properties defined in globals.css for theme consistency