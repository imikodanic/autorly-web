# Autorly Web

Autorly Web is a Next.js application that lets you automatically generate SEO-friendly blog posts for your brand. The app integrates Supabase for authentication and data storage and uses OpenAI to create unique blog content.

## Features

- **User authentication** powered by Supabase.
- **Brand workspace** setup so the AI can learn about your business.
- **AI blog generation** using the OpenAI API with customizable prompts.
- **Dashboard** for managing generated blogs.
- **Tailwind CSS** and **Radix UI** components for a modern interface.
- Prettier and ESLint configurations for consistent code style.

## Getting Started

1. Install dependencies using [pnpm](https://pnpm.io) (or npm/yarn):
   ```bash
   pnpm install
   ```
2. Copy `.env-example` to `.env.local` and provide the required keys:
   ```text
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   OPENAI_API_KEY=your-openai-key
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=google-oauth-client-id
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `app/` – Next.js routes and pages.
- `components/` – Reusable UI components and forms.
- `utils/` – Supabase helpers and other utilities.
- `lib/` – Shared helper functions.
- `public/` – Static assets such as icons and logos.

## Available Scripts

- `pnpm dev` – start the development server.
- `pnpm build` – build the application for production.
- `pnpm start` – run the production build.
- `pnpm lint` – run ESLint.
- `pnpm format` – run Prettier on the codebase.

## Deployment

This project is designed to be easily deployed on platforms such as Vercel. After setting up environment variables in your hosting provider, run the production build and start the server with `pnpm build && pnpm start`.

---

Autorly Web aims to streamline content creation for marketing teams by combining AI-powered generation with a simple brand-focused workflow.
