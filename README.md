# Prathamesh Chougale — Portfolio

This repository contains the source for Prathamesh Chougale's portfolio website built with Next.js (App Router). It showcases projects, experience, certificates and provides a contact form backed by a small API.

Key features
- Modern Next.js (App Router) structure
- TRPC endpoints for contact/chat features
- Theme support (dark/light) with a ThemeProvider
- Accessible, responsive UI components in `components/`
- PWA manifest and icons in `public/`

Quick start (development)

Install dependencies and run the dev server:

```powershell
bun install
bun dev
```

Open http://localhost:3000 in your browser.

Build for production

```powershell
bun run build
bun start
```

Environment variables
- This project uses typed env helpers (optional). Check `env.ts` and the server code for required vars. For local development, add a `.env` file with values for any server-only keys you use (database, email, API keys).

PWA and icons
- The web manifest is at `public/manifest.json`. Icons and screenshots live under `public/icons/` and `public/screenshots/` respectively.

Deployment
- This site is ready to deploy on Vercel. When deploying, set any required environment variables in the Vercel dashboard. The default `next.config.ts` is configured for standalone output.
