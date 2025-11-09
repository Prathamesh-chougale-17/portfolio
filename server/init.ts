import { initTRPC } from "@trpc/server";
import { cache } from "react";

/**
 * Create the tRPC context for each request
 * This is where you can add things like user authentication, database connections, etc.
 */
export const createTRPCContext = cache(() => {
  return {
    // Add any context data here (e.g., user session, database client)
    headers: new Headers(),
  };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

/**
 * Initialize tRPC with the context type
 */
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   * Uncomment if you want to use superjson for data transformation
   */
  // transformer: superjson,
});

/**
 * Create a server-side caller factory
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * Export reusable router and procedure helpers
 * @see https://trpc.io/docs/server/procedures
 */
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

/**
 * Middleware for procedures that require validation
 */
export const validatedProcedure = publicProcedure.use((opts) => {
  // Add any validation logic here
  return opts.next();
});
