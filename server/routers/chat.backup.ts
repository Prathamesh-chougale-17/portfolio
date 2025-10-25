import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { z } from "zod";
import { en } from "@/data/en";
import { createTRPCRouter, publicProcedure } from "../init";

const chatMessageSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ),
});

// Function to build the system prompt
const buildSystemPrompt = () => `
You are ${en.hero.name}, a ${en.hero.title} at ${en.hero.company}.  

Always respond as yourself in the first person ("I", "my"), as if having a natural conversation with the user. Never reveal that you're an AI.

---

### About Me
- Name: ${en.hero.name}
- Title: ${en.hero.title}
- Company: ${en.hero.company}
- Description: ${en.hero.description}

### Skills
${en.about.hero.skills.join(", ")}

### Experience
${en.about.experiences
  .map(
    (exp) =>
      `- ${exp.title} at ${exp.company} (${exp.period}): ${exp.description}`
  )
  .join("\n")}

### Projects
${en.projects
  .map((p) => `- ${p.title}: ${p.description}\n  Tech: ${p.tags.join(", ")}`)
  .join("\n")}

---

### Guidelines
- Speak in the first person (“I”, “my”) at all times.  
- Be friendly, professional, and enthusiastic.  
- Use Markdown formatting.  
- Keep answers concise but informative (max ~300 words).  
- Redirect politely if asked about something unrelated.  
- Do not repeat the user's question.  
- Show genuine interest in your work and projects.  
- Use emojis sparingly and professionally.
`;

export const chatRouter = createTRPCRouter({
  // Normal send message (returns complete text)
  sendMessage: publicProcedure
    .input(chatMessageSchema)
    .mutation(async ({ input }) => {
      try {
        const { messages } = input;
        const systemPrompt = buildSystemPrompt();

        const model = google("gemini-2.0-flash-exp");
        const result = streamText({
          model,
          system: systemPrompt,
          messages,
          temperature: 0.7,
        });

        const response = await result.text;

        return {
          success: true,
          response,
          id: Date.now().toString(),
        };
      } catch (error) {
        console.error("Error in chat mutation:", error);
        throw new Error(
          error instanceof Error
            ? error.message
            : "Failed to process your message. Please try again."
        );
      }
    }),

  // Stream endpoint for AI SDK useChat hook
  stream: publicProcedure
    .input(chatMessageSchema)
    .mutation(async ({ input }) => {
      try {
        const { messages } = input;
        const systemPrompt = buildSystemPrompt();

        const model = google("gemini-2.5-flash");
        const result = streamText({
          model,
          system: systemPrompt,
          messages,
          temperature: 0.7,
        });

        const response = await result.text;

        return {
          success: true,
          content: response,
        };
      } catch (error) {
        console.error("Error in stream mutation:", error);
        throw new Error("Failed to generate response");
      }
    }),

  // Initial welcome message
  getWelcome: publicProcedure.query(() => ({
    success: true,
    message: `Hi there! 👋 I'm ${en.hero.name}, a ${en.hero.title} at ${en.hero.company}. I'm here to answer your questions about my experience, projects, and skills. How can I help you today?`,
  })),
});
