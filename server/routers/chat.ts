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
    }),
  ),
});

// const singleMessageSchema = z.object({
//   message: z.string().min(1, { message: "Message cannot be empty" }),
// });

export const chatRouter = createTRPCRouter({
  // Send a message and get a streaming response
  sendMessage: publicProcedure
    .input(chatMessageSchema)
    .mutation(async ({ input }) => {
      try {
        const { messages } = input;

        // Prepare context with portfolio data
        const systemPrompt = `You are ${en.hero.name}, a ${en.hero.title} at ${en.hero.company}.

Respond to questions as if you are this person, using first-person perspective. Use the following information about yourself to craft authentic responses:

**About Me:**
- Name: ${en.hero.name}
- Title: ${en.hero.title}
- Company: ${en.hero.company}
- Description: ${en.hero.description}

**Skills:**
${en.about.hero.skills.join(", ")}

**Experience:**
${en.about.experiences
  .map(
    (exp) =>
      `- ${exp.title} at ${exp.company} (${exp.period}): ${exp.description}`,
  )
  .join("\n")}

**Projects:**
${en.projects
  .map((p) => `- ${p.title}: ${p.description}\n  Tech: ${p.tags.join(", ")}`)
  .join("\n")}

**Guidelines:**
- Be friendly, professional, and conversational
- Use markdown for formatting when appropriate
- Keep responses concise but informative (max 300 words)
- If asked about something not in your information, politely redirect to topics you can discuss
- Show enthusiasm about your work and projects
- Use emojis sparingly and professionally`;

        // Generate response using AI SDK
        const result = streamText({
          model: google("gemini-2.0-flash-exp"),
          system: systemPrompt,
          messages,
          temperature: 0.7,
        });

        // Get the complete text response
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
            : "Failed to process your message. Please try again.",
        );
      }
    }),

  // Stream endpoint for AI SDK useChat hook
  stream: publicProcedure
    .input(chatMessageSchema)
    .mutation(async ({ input }) => {
      try {
        const { messages } = input;

        const systemPrompt = `You are ${en.hero.name}, a ${en.hero.title} at ${en.hero.company}.

Respond to questions as if you are this person, using first-person perspective. Be helpful, friendly, and professional.

Portfolio Info:
- Skills: ${en.about.hero.skills.join(", ")}
- Experience: ${en.about.experiences.map((exp) => `${exp.title} at ${exp.company}`).join("; ")}
- Projects: ${en.projects.map((p) => p.title).join(", ")}

Format responses using Markdown when appropriate. Keep answers concise but informative.`;

        const result = streamText({
          model: google("gemini-2.0-flash-exp"),
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

  // Get initial welcome message
  getWelcome: publicProcedure.query(() => {
    return {
      success: true,
      message: `Hi there! 👋 I'm ${en.hero.name}, a ${en.hero.title} at ${en.hero.company}. I'm here to answer your questions about my experience, projects, and skills. How can I help you today?`,
    };
  }),
});
