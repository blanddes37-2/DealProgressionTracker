# 🏢 Commercial Deal Tracker

A modern, full-stack commercial real estate deal tracking dashboard built with React, TypeScript, and PostgreSQL. This application provides comprehensive deal management with a beautiful Material Design interface, threaded comments system, and visual deal progression tracking.

**Built by [Ben Landes](https://BenLandes.net)** - Vibe coded with ❤️ and Replit Agent

![Deal Tracker Dashboard](https://img.shields.io/badge/React-18.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue) ![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-Latest-green) ![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## ✨ Features

### 📊 Deal Management
- **Full CRUD Operations** - Create, read, update, and delete deals with real-time updates
- **10-Stage Deal Pipeline** - Track deals through: Prospecting → Active Discussions → Site Approved → LOI → IC Approved → In Legal → Executed → On Hold/Dead/Withdrawn
- **Dual View Modes** - Toggle between card grid and detailed table views
- **Advanced Filtering** - Search and filter by status, location, broker, brand, and deal type

### 💬 Threaded Comment System
- **Historical Context** - All comments timestamped and preserved
- **Full CRUD on Comments** - Add, edit, and delete comments with confirmation dialogs
- **Professional Layout** - Two-column modal with deal details and comment thread side-by-side

### 🎯 Visual Progress Tracking
- **Compact Timeline** - Condensed progress bar that fits perfectly within card boundaries
- **Stage Icons** - Visual indicators for each deal stage with color coding
- **4-Week History View** - See deal progression over the past month at a glance

### 🎨 Professional UI/UX
- **Material Design Theme** - Clean, modern interface with light/dark mode support
- **Responsive Layout** - Optimized for desktop with mobile considerations
- **Real-time Updates** - React Query for efficient data fetching and caching
- **Toast Notifications** - User feedback for all actions

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for blazing fast development and optimized builds
- **TanStack Query (React Query)** for server state management
- **Tailwind CSS** with custom Material Design theme
- **Radix UI** primitives with shadcn/ui components
- **Wouter** for lightweight routing
- **React Hook Form** with Zod validation

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database (Neon serverless)
- **Drizzle ORM** for type-safe database operations
- **Zod** for schema validation
- **Connect-pg-simple** for session management

## 📸 Screenshots

### Card View
The card view provides a clean, scannable overview of all deals with compact progress indicators and key information at a glance.

### Table View
The table view offers detailed information with sortable columns, full progress bars, and comprehensive deal data.

### Comment Thread
Professional two-column layout showing deal details alongside threaded comments with timestamps.

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/commercial-deal-tracker.git
cd commercial-deal-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your database connection:
```
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=your-secure-session-secret
```

4. **Push database schema**
```bash
npm run db:push
```

5. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🏗️ Architecture Decisions

### Why This Stack?
- **TypeScript Everywhere** - Type safety from database to UI
- **Drizzle ORM** - Type-safe queries with excellent DX
- **React Query** - Efficient caching and real-time updates
- **PostgreSQL** - Robust, scalable data storage
- **Tailwind + Radix UI** - Rapid development with accessibility built-in

### Key Design Patterns
- **Storage Interface Pattern** - Abstracted data layer for easy testing/swapping
- **Optimistic Updates** - Instant UI feedback with React Query
- **Component Composition** - Reusable, modular components
- **Type-First Development** - Shared types between frontend and backend

## 📝 Data Model

The application uses a normalized database structure with three main entities:

- **Deals** - Core entity tracking all deal information
- **Comments** - Threaded comments linked to deals via foreign key
- **Deal History** - Weekly snapshots for progression tracking

## 🎯 About Vibe Coding

This project was "vibe coded" - built rapidly with AI assistance (Replit Agent) while maintaining full creative control and decision-making. It represents a new way of developing software where human creativity and AI capabilities combine to ship quality products fast.

## 👨‍💻 About the Developer

**Ben Landes** - Full-stack developer passionate about building beautiful, functional applications.  
Learn more at [BenLandes.net](https://BenLandes.net)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Built with [Replit](https://replit.com) and Replit Agent
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev)

---

**Note**: All data shown in demos is synthetic and generated for demonstration purposes. No proprietary information is included in this repository.