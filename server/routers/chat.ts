import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../init";
import { generateResponse } from "@/lib/gemini";
import client from "@/db/client";
import { insertChatMessage } from "@/db/schema/chat";
import { en } from "@/data/en";

const chatMessageSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty" }),
});

export const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(chatMessageSchema)
    .mutation(async ({ input }) => {
      const { message } = input;

      try {
        // Connect to the database
        await client.connect();
        const db = client.db(process.env.DATABASE_NAME);

        // Store the user message
        const query = await insertChatMessage(db, {
          role: "user",
          content: message,
          timestamp: new Date(),
        });

        // Prepare context with portfolio data
        const contextPrompt = `You are ${en.hero.name}, a ${en.hero.title} at ${
          en.hero.company
        }.

Respond to questions as if you are this person, using first-person perspective. Use the following information about yourself to craft authentic responses:

- Name: ${en.hero.name}
- Title: ${en.hero.title}
- Company: ${en.hero.company}
- Description: ${en.hero.description}
- Skills: ${en.about.hero.skills.join(", ")}
- Experience: ${en.about.experiences
          .map((exp) => `${exp.title} at ${exp.company} (${exp.period})`)
          .join("; ")}
- Projects: ${en.projects.map((p) => p.title).join(", ")}

Format your response using Markdown.
If you cannot answer a question based on the provided information, respond with "I don't have enough information to answer that question, but I'd be happy to discuss my projects, experience, or skills."

User question: ${message}`;

        // Generate response with context
        const responseText = await generateResponse([
          {
            role: "user",
            content: contextPrompt,
          },
        ]);

        // Store the assistant response
        await insertChatMessage(db, {
          queryId: query.insertedId.toString(),
          role: "assistant",
          content: responseText,
          timestamp: new Date(),
        });

        return {
          success: true,
          response: responseText,
          id: query.insertedId.toString(),
        };
      } catch (error) {
        console.error("Error in chat mutation:", error);
        throw new Error("Failed to process your message. Please try again.");
      } finally {
        await client.close();
      }
    }),

  getHistory: publicProcedure.query(async () => {
    try {
      await client.connect();
      const db = client.db(process.env.DATABASE_NAME);

      // Get the most recent conversation (limited to last 50 messages)
      const messages = await db
        .collection("chat_messages")
        .find({})
        .sort({ timestamp: -1 })
        .limit(50)
        .toArray();

      return {
        success: true,
        messages: messages.reverse().map((msg) => ({
          id: msg._id.toString(),
          role: msg.role as "user" | "assistant",
          content: msg.content,
          timestamp: msg.timestamp,
        })),
      };
    } catch (error) {
      console.error("Error fetching chat history:", error);
      throw new Error("Failed to fetch chat history.");
    } finally {
      await client.close();
    }
  }),

  clearHistory: publicProcedure.mutation(async () => {
    try {
      await client.connect();
      const db = client.db(process.env.DATABASE_NAME);

      await db.collection("chat_messages").deleteMany({});

      return {
        success: true,
        message: "Chat history cleared successfully",
      };
    } catch (error) {
      console.error("Error clearing chat history:", error);
      throw new Error("Failed to clear chat history.");
    } finally {
      await client.close();
    }
  }),
});
