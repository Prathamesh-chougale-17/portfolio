This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Environment (T3 / @t3-oss/env-nextjs) integration
-----------------------------------------------

This repository can validate and provide typed environment variables at build/runtime using the T3 env helpers. The recommended approach is to add a small schema file and validate it during Next.js build so that missing or invalid environment variables fail fast.

1) Install the runtime packages (example using pnpm):
   pnpm add @t3-oss/env-nextjs zod

2) Add a schema file (example at `src/env.ts`). This file defines the server and client env schema and maps runtime variables for Next.js:

```src/env.ts#L1-67
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Application environment schema
 *
 * - Define server-only variables under `server`.
 * - Define public (client) variables under `client`.
 *
 * Note: For Next.js >= 13.4.4 you can rely on Next's runtime variable handling
 * for client keys — the runtimeEnv below maps process.env keys explicitly to
 * satisfy the library and ensure types at build time.
 */
export const env = createEnv({
  server: {
    // Database
    MONGODB_URI: z.string().min(1),
    DATABASE_NAME: z.string().min(1),

    // Email (nodemailer)
    EMAIL_SERVER_HOST: z.string().min(1),
    EMAIL_SERVER_PORT: z.string().min(1),
    EMAIL_SERVER_USER: z.string().min(1),
    EMAIL_SERVER_PASSWORD: z.string().min(1),
    EMAIL_ADMIN: z.string().min(1),

    // 3rd-party / AI
    GEMINI_API_KEY: z.string().min(1),

    // Optional misc server vars
    NODE_ENV: z.string().optional(),
    // Add other server-only env variables here as needed...
  },

  client: {
    // Public variables exposed to client bundles (prefix NEXT_PUBLIC_)
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SOME_FEATURE_FLAG: z.string().optional(),
  },

  // Explicit runtime mapping so Next picks up the right values at build/runtime.
  // This is strict: list all keys you use here.
  runtimeEnv: {
    MONGODB_URI: process.env.MONGODB_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_ADMIN: process.env.EMAIL_ADMIN,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SOME_FEATURE_FLAG: process.env.NEXT_PUBLIC_SOME_FEATURE_FLAG,
    NODE_ENV: process.env.NODE_ENV,
  },

  /**
   * If you prefer splitting server/client schemas into separate files to
   * avoid shipping server variable NAMES to the client bundle, do that.
   *
   * Example alternative:
   *  - src/env/server.ts -> createEnv({ server: { ... }, experimental__runtimeEnv: process.env })
   *  - src/env/client.ts -> createEnv({ client: { ... }, runtimeEnv: { NEXT_PUBLIC_...: process.env.NEXT_PUBLIC_... } })
   *
   * See the @t3-oss/env-nextjs docs for recommendations.
   */
});
```

3) Validate at build time (recommended)

Import the env file from your Next.js config so schema validation runs during build. Example `next.config.js` snippet (this repository includes a `next.config.js` equivalent):

```next.config.js#L1-39
import { fileURLToPath } from "node:url";
import createJiti from "jiti";

/**
 * Use jiti to import the TS env file at build-time so the schema is validated
 * during Next.js build. This mirrors the recommendation in the T3 env docs.
 *
 * jiti allows importing TypeScript files from this JS config reliably.
 */
const jiti = createJiti(fileURLToPath(import.meta.url));

try {
  // Importing the env file will run its Zod validations during build.
  // Adjust the path if your env file lives elsewhere (e.g. ./src/env.ts).
  jiti("./src/env");
} catch (err) {
  // If validation fails, surface a clear message and rethrow so the build fails.
  // This helps catch missing/wrong environment variable values early.
  // We still rethrow to ensure the build stops on invalid env.
  // eslint-disable-next-line no-console
  console.error("Environment validation failed during next.config.js import:", err);
  throw err;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for deployments that require a server artifact.
  output: "standalone",

  // Ensure env packages are transpiled for compatibility in the standalone build.
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],

  // Recommended to help catch problems in development
  reactStrictMode: true,

  // You can add additional Next.js config options below as needed.
};

export default nextConfig;
```

4) Use the typed env in your code

- On server files (API/route handlers, libs): import and reference server keys
  `import { env } from "~/src/env";`
  then use `env.MONGODB_URI`, `env.GEMINI_API_KEY`, etc.

- On client code import the client env (only NEXT_PUBLIC_ keys will be available):
  `import { env } from "~/src/env";`
  then use `env.NEXT_PUBLIC_SITE_URL` (if defined).

Notes
- If environment variable names themselves are sensitive, split server and client schemas into separate files (`src/env/server.ts` and `src/env/client.ts`) so server-only names are not present in client bundles.
- Add the required variables to your deployment platform (Vercel, Fly, etc.) and to your local `.env` for development.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
