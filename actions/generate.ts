"use server";

import { generateResponse } from "@/lib/gemini";
import client from "@/db/client";
import { insertChatMessage } from "@/db/schema/chat";
import { en } from "@/data/en";
import { revalidatePath } from "next/cache";

export async function generateChatResponse(message: string) {
  try {
    if (!message) {
      throw new Error("Message is required");
    }

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

    // Revalidate the chat path to refresh UI
    revalidatePath("/");

    return {
      success: true,
      response: responseText,
    };
  } catch (error) {
    console.error("Error in generate action:", error);
    return {
      success: false,
      error: "Failed to process request",
    };
  } finally {
    // Commented out to use connection pooling in production
    await client.close();
  }
}

export async function getChatHistory() {
  try {
    // Connect to the database
    await client.connect();
    const db = client.db(process.env.DATABASE_NAME);

    // Get the most recent conversation (limited to last 20 messages)
    const messages = await db
      .collection("chat_messages")
      .find({})
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray();

    return {
      success: true,
      messages: messages.reverse(),
    };
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return {
      success: false,
      messages: [],
      error: "Failed to fetch chat history",
    };
  } finally {
    // Commented out to use connection pooling in production
    await client.close();
  }
}
