import { createTRPCRouter } from "../init";
import { chatRouter } from "./chat";
import { contactRouter } from "./contact";
import { leetcodeRouter } from "./leetcode";

/**
 * This is the primary router for your server.
 *
 * All routers added in /server/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  contact: contactRouter,
  chat: chatRouter,
  leetcode: leetcodeRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
