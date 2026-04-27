# Wallpaper Platform

A full-stack wallpaper sharing platform where users can upload, explore, download, and manage high-quality wallpapers. This project demonstrates modern full-stack development practices including authentication, authorization, image processing, cloud storage integration, admin management, pagination, and optimized rendering strategies using **Next.js 16**.

Built with **Next.js, TypeScript, Prisma, PostgreSQL, Better Auth, DigitalOcean Spaces, Tailwind CSS, and shadcn/ui**.

---

# 🚀 Features

## Public Home Page

- Publicly accessible homepage for unauthenticated users
- Browse all uploaded wallpapers
- Database-driven pagination using search params
- Responsive wallpaper grid layout
- Supports both vertical and horizontal wallpapers
- Download wallpapers directly
- Desktop hover interactions:
  - User avatar
  - Username
  - Download button
  - Favorite button
- Mobile-friendly UI without hover dependency

---

## 🔐 Authentication System

- User registration
- User login
- Secure session management using Better Auth
- Auto login after signup
- Password hashing using Argon2
- Cookie-based authentication for Next.js

---

## 👤 User Profile Management

Users can fully manage their profile:

- Update name
- Change username
- Change email
- Change password
- Upload avatar
- Upload cover image
- Update bio
- Delete account permanently

---

## 🖼 Wallpaper Upload System

Authenticated users can upload wallpapers with:

- Image file selection
- Orientation-based uploads:
  - Vertical wallpapers
  - Horizontal wallpapers
- Image processing using Sharp
- Upload files to DigitalOcean Spaces
- S3-compatible object storage
- CDN image delivery optimization

---

## ❤️ Favorites System

- Save wallpapers to favorites
- Dedicated favorites page
- View all liked wallpapers later
- Protected route access

---

## 🔒 Protected Routes

The following routes require authentication:

- Create page
- Profile page
- Settings page
- Favorites page

Public users can only browse wallpapers.

---

# 👑 Admin Dashboard

## Admin Panel

Admin-only features include:

- View all registered users
- Ban users
- Delete users
- View all user wallpapers

---

## Dynamic Admin Route

```bash
/admin/[username]
```

Features:

- View all wallpapers uploaded by specific users
- Delete user wallpapers

---

# ⚡ Rendering Strategy

## Dynamic Route Handling

Used for:

- Homepage pagination with `searchParams`
- Public wallpaper browsing
- Database-driven paginated content
- Dynamic admin route (`/admin/[username]`)

---

## Server Components

Used for:

- Fetching wallpapers from database
- Protected page data fetching
- Admin dashboard data fetching
- Profile data rendering
- Favorites page rendering

---

## Static Optimization

Next.js automatically optimizes static assets such as:

- UI components
- Static metadata
- Public assets

---

## Performance Optimizations

- Prisma optimized database queries
- Pagination for scalable content loading
- CDN image delivery
- Image processing with Sharp
- Reduced client-side JavaScript using React Server Components

---

# ☁ Cloud Infrastructure

## Hosting

Hosted on DigitalOcean App Platform

---

## Database

- Managed PostgreSQL database

---

## Object Storage

- DigitalOcean Spaces
- S3-compatible storage

---

## Networking

- VPC integration

---

## CDN

- CDN endpoint configuration for faster image delivery

---

## Domain

- Custom domain connected
- Managed through Cloudflare

---

# 🛠 Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide React

---

## Backend

- Prisma ORM
- PostgreSQL
- Better Auth
- Argon2

---

## File Upload & Processing

- AWS S3 SDK
- Sharp
- DigitalOcean Spaces

---

## Forms & Validation

- React Hook Form
- Zod

---

# 🚀 Getting Started

## Prerequisites

- Node.js **22.x+**
- npm **11.x+**

---

## Installation

Clone repository:

```bash
git clone https://github.com/sohan-sadhukhan/wallpaper-platform.git
cd wallpaper-platform
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create `.env` file:

```env
DATABASE_URL=

BETTER_AUTH_SECRET=

BETTER_AUTH_URL=

SPACES_KEY=

SPACES_SECRET=

SPACES_ENDPOINT=

SPACES_BUCKET_NAME=

NEXT_PUBLIC_SPACES_CDN_ENDPOINT=
```

---

# Database Setup

Run migrations:

```bash
npm run migrate
```

Seed admin account:

```bash
npx prisma db seed
```

---

# Run Development Server

```bash
npm run dev
```

Visit:

```bash
http://localhost:3000
```

---

# Available Scripts

```bash
npm run dev
```

Start development server

```bash
npm run build
```

Build production app

```bash
npm run start
```

Start production server

```bash
npm run lint
```

Run ESLint

```bash
npm run migrate
```

Run Prisma migrations

```bash
npm run studio
```

Open Prisma Studio

```bash
npm run prod
```

Lint + Build + Start production app

---

# 🎯 Core Learning Concepts

This project demonstrates:

- Authentication & authorization
- Role-based access control
- Admin dashboard architecture
- Full CRUD operations
- File uploads
- Image optimization
- CDN integration
- Pagination
- Protected routes
- Dynamic routing
- Server actions
- Responsive design
- Semantic HTML
- Cloud deployment infrastructure
- Production-ready architecture

---

# 🔧 Deployment

Deployed on DigitalOcean App Platform with:

- Compute hosting
- Managed PostgreSQL
- Object storage
- CDN
- VPC networking
- Custom domain support

---

# 📄 License

This project is licensed under the MIT License.

---

# 👤 Author

**Sohan Sadhukhan**

GitHub: https://github.com/sohan-sadhukhan

Project Repository:  
https://github.com/sohan-sadhukhan/wallpaper-platform
