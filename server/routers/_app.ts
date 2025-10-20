import { createTRPCRouter } from "../init";
import { contactRouter } from "./contact";
import { chatRouter } from "./chat";

/**
 * This is the primary router for your server.
 *
 * All routers added in /server/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  contact: contactRouter,
  chat: chatRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
