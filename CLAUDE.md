# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Personal Tracking System** - a full-stack application for tracking habits, goals, and personal metrics with gamification elements. The project structure includes:

- **`frontend/`** - Next.js application with shadcn/ui components, modular architecture, and theme support
- **`backend/`** - Express.js API with MongoDB/Prisma, JWT authentication, and comprehensive tracking features

## Commands

### Frontend Application (`frontend/`)
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend API (`backend/`)
```bash
cd backend
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Sync schema with MongoDB
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Populate with sample data
npm run lint         # Run ESLint
npm run test         # Run tests
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

### Backend API (`backend/`)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT with bcryptjs password hashing
- **Security**: Helmet, CORS, Rate Limiting, Input validation with Zod
- **Logging**: Morgan for HTTP request logging
- **Testing**: Jest with Supertest
- **Development**: tsx for hot reload during development

### Key Architectural Patterns

#### Frontend Modular Architecture
- **Modular Components**: Each feature organized in `components/[feature]/` with:
  - `[feature].tsx` - Main component file
  - `[feature].types.ts` - Centralized TypeScript interfaces
  - `components/` - Sub-components directory
  - `hooks/use-[feature].ts` - Custom React hooks for state management
  - `index.ts` - Barrel export file
- **Component Standards**: All components have `displayName` and default exports
- **Props Forwarding**: Components extend `HTMLAttributes` for flexibility
- **Theme System**: Dark/light mode theming with `ThemeProvider` wrapper
- **Utility Functions**: Tailwind class merging utilities in `lib/utils.ts` using clsx and tailwind-merge
- **Page Structure**: App Router pages reduced to simple component calls
- **Responsive Design**: Mobile-first responsive design patterns

#### Backend RESTful Architecture
- **Route Organization**: Feature-based routing in `routes/` directory
- **Controller Pattern**: Business logic separated in `controllers/`
- **Middleware**: Authentication and validation middleware
- **Database Layer**: Prisma ORM with type-safe queries
- **Error Handling**: Global error handler with express-async-errors
- **Environment Configuration**: Centralized config with validation

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

### Backend API Endpoints
- **Authentication**: `/api/auth/` - User registration, login, profile management
- **Habits**: `/api/habits/` - CRUD operations, completion tracking, daily habits
- **Goals**: `/api/goals/` - Goal management, milestones, progress tracking, notes
- **Analytics**: `/api/analytics/` - User statistics, trends, metrics, completion rates

### Application Patterns
- **Gamification**: Points system, streaks, achievements, and motivational messaging
- **Real-time UI**: Celebration animations and progress feedback
- **Theme Support**: System-aware dark/light mode with smooth transitions
- **Data Management**: Backend API with MongoDB for persistent data storage
- **Authentication**: JWT-based authentication with secure password hashing

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

#### Frontend Structure
```
frontend/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Dashboard (main page) - simple component call
│   ├── layout.tsx    # Root layout with theme provider
│   ├── globals.css   # Global styles and Tailwind imports
│   ├── habits/page.tsx       # Habits page - simple component call
│   ├── goals/page.tsx        # Goals page - simple component call
│   ├── analytics/page.tsx    # Analytics page - simple component call
│   └── profile/page.tsx      # Profile page - simple component call
├── components/       # React components (modular architecture)
│   ├── theme-provider.tsx    # Theme context wrapper
│   ├── ui/                   # shadcn/ui component library
│   ├── dashboard/            # Dashboard feature module
│   │   ├── dashboard.tsx     # Main component
│   │   ├── dashboard.types.ts # TypeScript interfaces
│   │   ├── hooks/use-dashboard.ts # Custom hook
│   │   ├── components/       # Sub-components
│   │   └── index.ts          # Barrel exports
│   ├── habits/               # Habits feature module
│   ├── goals/                # Goals feature module
│   ├── analytics/            # Analytics feature module
│   └── profile/              # Profile feature module
├── hooks/            # Global custom React hooks
├── lib/              # Utility functions
│   └── utils.ts      # Class merging and helpers
└── styles/           # Additional CSS files
```

#### Backend Structure
```
backend/
├── src/
│   ├── index.ts              # Express app entry point
│   ├── config/               # Configuration files
│   │   ├── database.ts       # Database connection
│   │   └── env.ts           # Environment variables
│   ├── controllers/          # Business logic controllers
│   │   ├── auth.controller.ts
│   │   ├── habits.controller.ts
│   │   ├── goals.controller.ts
│   │   └── analytics.controller.ts
│   ├── routes/               # API route definitions
│   │   ├── auth.routes.ts
│   │   ├── habits.routes.ts
│   │   ├── goals.routes.ts
│   │   └── analytics.routes.ts
│   ├── middleware/           # Express middleware
│   │   └── auth.ts          # JWT authentication
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   └── scripts/             # Database scripts
│       └── seed.ts          # Database seeding
├── prisma/
│   └── schema.prisma        # Database schema
├── package.json
└── tsconfig.json
```

## Working with This Codebase

### Frontend Development

#### Adding New Feature Modules
1. Create new feature directory in `components/[feature]/`
2. Follow the modular architecture pattern:
   - `[feature].tsx` - Main component with `'use client'` directive
   - `[feature].types.ts` - TypeScript interfaces and types
   - `hooks/use-[feature].ts` - Custom React hook for state management
   - `components/` - Sub-components directory
   - `index.ts` - Barrel export file
3. Add `displayName` to all components: `Component.displayName = 'ComponentName';`
4. Extend `HTMLAttributes<HTMLDivElement>` for component props flexibility
5. Create page file in `app/` as simple component call: `return <Feature />;`

#### Component Development
- Import and use shadcn/ui components from `@/components/ui/`
- Use `useTheme` from next-themes for theme-aware components
- Leverage Lucide React icons for consistent iconography
- Follow accessibility best practices provided by shadcn/ui
- Use `cn()` utility for conditional styling: `cn("base-class", condition && "conditional-class")`

#### Styling Guidelines
- Use Tailwind's design system variables for spacing and colors
- Apply responsive design with `sm:`, `md:`, `lg:` prefixes
- Leverage CSS custom properties defined in globals.css for theme consistency
- Follow mobile-first responsive design approach

### Backend Development

#### Adding New API Endpoints
1. Create controller in `src/controllers/[feature].controller.ts`
2. Create routes in `src/routes/[feature].routes.ts`
3. Add route to main `src/index.ts` file
4. Use Zod for input validation
5. Follow RESTful conventions for endpoint naming

#### Database Development
1. Update Prisma schema in `prisma/schema.prisma`
2. Run `npm run db:generate` to generate client
3. Run `npm run db:push` to sync with MongoDB
4. Use Prisma client for type-safe database operations

#### Security Best Practices
- Always validate input with Zod schemas
- Use JWT middleware for protected routes
- Implement proper error handling
- Follow principle of least privilege for database access
- Never expose sensitive data in API responses

### Development Workflow

#### Frontend Changes
```bash
cd frontend
npm run dev      # Start development server
npm run lint     # Check for linting errors
```

#### Backend Changes
```bash
cd backend
npm run dev          # Start development server
npm run db:generate  # After schema changes
npm run db:push      # Sync database
npm run lint         # Check for linting errors
npm run test         # Run tests
```

#### Database Operations
```bash
cd backend
npm run db:studio    # Open Prisma Studio for data inspection
npm run db:seed      # Populate with sample data
```