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
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
    GOOGLE_ANALYTICS_ID: z.string().min(1),

    // Optional misc server vars
    NODE_ENV: z.string().optional(),
    // Add other server-only env variables here as needed...
  },

  client: {
    // Public variables exposed to client bundles (prefix NEXT_PUBLIC_)
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
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
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SOME_FEATURE_FLAG: process.env.NEXT_PUBLIC_SOME_FEATURE_FLAG,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
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
