# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Local Development:**

```bash
bun install          # Install dependencies
bun dev              # Start dev server at http://localhost:3000
```

**Code Quality:**

```bash
bun lint             # Run Biome linter (checks code)
bun format           # Format code with Biome
```

**Production:**

```bash
bun run build        # Build for production
bun start            # Start production server
```

## Architecture Overview

This is a Next.js 16 App Router portfolio application with tRPC API integration, MongoDB database, AI chat features, and full type safety.

### Directory Structure

- `app/` - Next.js App Router pages and layouts. API route at `app/api/trpc/[trpc]/route.ts`
- `server/` - tRPC backend layer (initialization, routers, client setup)
- `components/` - Feature-organized React components (home/, about/, contact/, project/, layout/, ui/, ai-elements/)
- `db/` - MongoDB client singleton and schema definitions
- `data/` - **Multi-language content files** (`lang.ts` for English, `hi.ts` for Hindi, etc.)
- `context/` - React Context providers (theme, locale)
- `lib/` - Utility functions, constants, and i18n configuration
- `types/` - TypeScript type definitions
- `env.ts` - Environment variable validation (t3-oss/env-nextjs)

### tRPC Architecture

The API is built with tRPC v11.6.0 for end-to-end type safety:

**Setup chain:**

```
server/init.ts → server/routers/_app.ts → app/api/trpc/[trpc]/route.ts
                            ↓
                server/client.tsx (client provider)
```

**Three main routers in `server/routers/`:**

1. `chat.ts` - AI chat using Google Gemini API (gemini-2.0-flash-exp), stores messages in MongoDB
2. `contact.ts` - Contact form submission via Nodemailer email
3. `leetcode.ts` - Fetches LeetCode user statistics from GraphQL API

**Client usage:**

- Client components use `trpc.routerName.procedureName.useMutation()` or `.useQuery()`
- Server components use `serverTrpc.routerName.procedureName()` from `server/server.tsx`

**Context creation:**

- Context created in `server/init.ts` via `createTRPCContext()` using React `cache()`
- Currently includes headers for future auth implementation

### Environment Variables

Validated with Zod in `env.ts`. Required variables:

**Server-only:**

- `MONGODB_URI` - Database connection string
- `DATABASE_NAME` - Database name
- `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD` - SMTP config
- `EMAIL_ADMIN` - Admin email for contact form
- `GOOGLE_GENERATIVE_AI_API_KEY` - Gemini AI API key
- `GOOGLE_ANALYTICS_ID` - Analytics tracking

**Public (optional):**

- `NEXT_PUBLIC_SITE_URL` - Site URL (defaults to localhost)

### Database (MongoDB)

**Client:** `db/client.ts` uses singleton pattern with HMR support in development

- Global variable caching during hot reload (`_mongoClient`)
- Fresh client per connection in production

**Schemas:** Defined in `db/schema/`

- `chat.ts` - Chat message schema with `insertChatMessage()` and `getChatHistory()` operations
- Collection: `chatMessages` in database specified by `DATABASE_NAME` env var

### Server/Client Boundary

- Server components are default (pages, layouts)
- Client components marked with `"use client"` directive
- `server-only` package prevents server code from bundling client-side
- `client-only` package prevents client code from running server-side

**Client components include:**

- Forms (TanStack Form)
- Chat interface
- Theme toggle
- Interactive UI elements

### Form Handling

Uses **TanStack Form** (v1.23.7) with Zod validation:

- Client-side validation in component
- Server-side validation in tRPC router (same schema)
- See `components/contact/contact-form.tsx` for example

### Styling & Theming

- **Tailwind CSS 4** with @tailwindcss/postcss
- **Shadcn/ui** components (new-york style, zinc base color)
- **next-themes** for dark/light mode via `context/theme-provider.tsx`
- CSS variables defined in `app/globals.css` using oklch color space
- Icons from **lucide-react** (v0.546)

### Multi-Language (i18n) Support

The portfolio supports multiple languages with a custom i18n implementation:

**Supported Languages:**

- English (`en`) - Default
- Hindi (`hi`)

**Architecture:**

- Translations stored in `data/` folder (`lang.ts`, `hi.ts`)
- Type-safe via `types/lang.ts` interface (all languages share same structure)
- Locale management via `context/locale-provider.tsx`
- Language detection from browser or localStorage
- Language switcher in navbar (`components/ui/language-switcher.tsx`)

**Usage in components:**

```typescript
"use client";
import { useLocale } from "@/context/locale-provider";

export default function MyComponent() {
  const { t, locale, setLocale } = useLocale();
  return <h1>{t.hero.title}</h1>; // Automatically uses selected language
}
```

**Adding new languages:**

1. Create `data/{locale}.ts` with translations (use `langtype` interface)
2. Update `lib/i18n.ts` to add locale to `Locale` type and arrays
3. Register in `lib/translations.ts`
4. See [docs/I18N_GUIDE.md](docs/I18N_GUIDE.md) for detailed instructions

**Important:** Always use `useLocale()` hook instead of importing `en` directly for multi-language support.

### Content Management

All content lives in language-specific files in `data/`:

- `data/lang.ts` - English content
- `data/hi.ts` - Hindi content
- Each contains: Hero section, projects, achievements, experiences, tech stack, stats
- Type-safe via `types/lang.ts` interface
- All languages share the same structure

### Path Aliases

TypeScript path alias configured in `tsconfig.json`:

```typescript
"@/*"; // Maps to root directory
```

Example: `import { useLocale } from "@/context/locale-provider"`

### Code Quality Tools

**Biome** (v2.3.0) replaces ESLint + Prettier:

- Linter and formatter in one
- Configuration in `biome.json`
- 2-space indentation
- Next.js/React recommended rules
- VCS integration with git

### Accessibility Requirements

The `.github/copilot-instructions.md` file contains comprehensive accessibility rules. Key requirements:

- Avoid `accessKey` and `aria-hidden` on focusable elements
- Use semantic HTML elements vs ARIA roles when possible
- Pair keyboard and mouse event handlers (`onClick` with `onKeyUp/Down/Press`)
- Add alt text to images, captions to media
- Include `lang` attribute on `<html>`, `title` on `<iframe>`/`<svg>`
- Valid ARIA roles, props, and values
- Use `<>...</>` vs `<Fragment>...</Fragment>`

### Security Headers

Production security headers configured in `next.config.ts`:

- HSTS (2 years, includeSubDomains, preload)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera/microphone/geolocation denied
- Service worker CSP
- CORS headers for `/api/*` routes

### PWA Features

- Service worker registration in `components/pwa-register.tsx`
- Manifest generation in `app/manifest.ts`
- Offline fallback page at `/offline`
- Icons and screenshots in `public/icons/` and `public/screenshots/`

### Deployment

Designed for Vercel deployment:

- References `VERCEL_URL` in `server/client.tsx`
- Set environment variables in Vercel dashboard
- Standalone output configured in `next.config.ts`

### Adding New tRPC Endpoints

1. Create procedure in `server/routers/{feature}.ts`
2. Add router to `server/routers/_app.ts` appRouter
3. Use Zod for input validation
4. Use in components via `trpc.{router}.{procedure}.useMutation()` or `.useQuery()`

Example:

```typescript
// server/routers/example.ts
export const exampleRouter = createTRPCRouter({
  getData: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return { data: "example" };
    }),
});

// server/routers/_app.ts
export const appRouter = createTRPCRouter({
  // ... existing routers
  example: exampleRouter,
});

// component.tsx
const { data } = trpc.example.getData.useQuery({ id: "123" });
```

### Performance Considerations

- React Query caching: 60s `staleTime` in `server/query-client.ts`
- Image optimization via Next.js `<Image>` component (required per copilot-instructions.md)
- Static asset caching
- Gzip compression enabled
- LeetCode API calls use `cache: "no-store"` for fresh data

### TypeScript Configuration

- Strict mode enabled
- Target: ES2017
- Module resolution: bundler
- JSX: react-jsx
- Path aliases via `@/*`
