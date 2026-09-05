# TechnoIVR — Professional Waterproofing Website

A complete business website for waterproofing and insulation services — featuring public pages, a secure admin panel, and analytics integration.

🔗 **Live:** [technoivr.vercel.app](https://technoivr.vercel.app)

## Features

- 🏠 Public pages: Home, Services, Gallery (with lightbox), Materials, Contact
- 🔐 Secure Admin Panel (Clerk authentication, protected routes and Server Actions)
- 📸 Manage photos, services, and materials from the admin panel (direct upload to Supabase Storage)
- 💬 Contact form with direct links (Phone, WhatsApp, Viber, Email, Facebook)
- 📊 Google Analytics 4 with conversion tracking (link clicks, form submissions)
- 📱 Fully responsive design with a mobile sidebar menu
- ⚡ Optimized performance: ISR caching, next/image optimization, pagination
- 🤖 AI assistant chat (Gemini) scaffolded in the admin panel (currently inactive, requires billing)

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **UI:** React 19 + Tailwind CSS 4
- **Database:** PostgreSQL (Supabase) + Prisma ORM
- **Storage:** Supabase Storage
- **Auth:** Clerk
- **AI:** Google Gemini API (`@google/genai`)
- **Analytics:** Google Analytics 4 (`@next/third-parties`)
- **Deployment:** Vercel
- **Uptime Monitoring:** UptimeRobot

## Project Structure

prisma/ # Database schema + seed data
src/
actions/ # Server Actions (contact form, uploads, CRUD, AI chat)
app/
admin/ # Admin panel (protected by Clerk auth)
services/
gallery/
materials/
contact/
components/
layout/ # Header (with mobile sidebar), Footer
sections/ # Hero, GalleryGrid, TrackedLink, reusable UI
lib/ # Prisma client, Supabase client, admin check

## Local Setup

1. Clone the repo and install dependencies:

```bash
   npm install
```

2. Copy `.env.example` to `.env` and fill in your own values (database, Supabase, Clerk, Analytics, Gemini keys):

```bash
   cp .env.example .env
```

3. Push the database schema and seed initial data:

```bash
   npx prisma db push
   npx prisma db seed
```

4. Start the development server:

```bash
   npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Workflow

This project follows a standard Git workflow: **Branch → Code → Commit → Push → Pull Request → Review → Merge**. Every push to `main` automatically triggers a deploy on Vercel.
