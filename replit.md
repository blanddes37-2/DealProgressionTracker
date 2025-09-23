# Commercial Deal Tracking Dashboard

## Overview

This is a commercial real estate deal tracking dashboard designed to help teams monitor office lease deals through a 10-stage progression system. The application provides comprehensive deal management with weekly historical tracking, filtering capabilities, and multiple view modes (grid and table). Built with a focus on efficiency and data clarity, it serves as a centralized platform for tracking deals from initial prospecting through execution.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with Material Design-inspired theme system supporting light/dark modes
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Development**: Hot module replacement with Vite integration
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions

### Design System
- **Component Strategy**: Enterprise-focused design system built on Material Design principles
- **Typography**: Inter font family via Google Fonts CDN
- **Color Palette**: Professional navy and gray-blue theme with status-specific colors
- **Layout**: CSS Grid for deal cards, Flexbox for internal components
- **Responsiveness**: Desktop-first design optimized for 1200px+ screens

### Data Model
- **Deal Progression**: 10-stage workflow (Prospecting → Active Discussions → Site Approved → LOI → IC Approved → In Legal → Executed → On Hold/Dead/Withdrawn)
- **Deal Types**: Support for MCA, Revenue Share, Profit Share (SOP), and Conventional deals
- **Historical Tracking**: Weekly progression history with 4-week lookback
- **Deal Attributes**: Comprehensive tracking including address, broker, brand (Regus/Spaces), RSF, owner, and detailed notes

### Key Features
- **Multi-View Display**: Toggle between grid cards and detailed table views
- **Advanced Filtering**: Search across multiple fields with stage, brand, deal type, broker, and location filters
- **Progress Visualization**: Horizontal progress bars with stage-specific iconography
- **Weekly History**: Visual progression tracking with 4-week historical view
- **Responsive Design**: Optimized for desktop workflow with mobile considerations

## External Dependencies

### UI and Component Libraries
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives (accordion, dialog, dropdown, select, etc.)
- **@tanstack/react-query**: Server state management and caching
- **class-variance-authority**: Utility for creating component variants
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider functionality

### Database and Backend
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **drizzle-zod**: Schema validation integration
- **connect-pg-simple**: PostgreSQL session store for Express

### Development and Build Tools
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

### Styling and Utilities
- **tailwindcss**: Utility-first CSS framework
- **tailwind-merge**: Utility for merging Tailwind classes
- **clsx**: Utility for constructing className strings conditionally
- **date-fns**: Modern JavaScript date utility library

### Form Handling
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **react-hook-form**: Performant forms with easy validation (implied dependency)
- **zod**: TypeScript-first schema validation