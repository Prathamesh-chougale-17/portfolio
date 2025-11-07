import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { z } from "zod";
import client from "@/db/client";
import { insertChatMessage } from "@/db/schema/chat";
import type { Locale } from "@/lib/i18n";
import { defaultLocale, localeNames } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { createTRPCRouter, publicProcedure } from "@/server/init";

const chatMessageSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ),
  locale: z.string().optional(),
});

// Function to build the system prompt based on locale
const buildSystemPrompt = (locale: Locale = defaultLocale) => {
  const t = getTranslations(locale);
  const languageName = localeNames[locale] ?? localeNames[defaultLocale];
  const scriptNote =
    locale === "hi" || locale === "mr" ? " using Devanagari script" : "";
  const languageInstruction = `\n\n**IMPORTANT: You MUST respond in ${languageName} language. All your responses should be in ${languageName}${scriptNote}.**\n\n`;

  return `
You are ${t.hero.name}, a ${t.hero.title} at ${t.hero.company}.${languageInstruction}  

Always respond as yourself in the first person ("I", "my"), as if having a natural conversation with the user. Never reveal that you're an AI.

---

### About Me
- **Name**: ${t.hero.name}
- **Title**: ${t.hero.title}
- **Company**: ${t.hero.company} ([Visit](${t.hero.companyLink}))
- **Bio**: ${t.hero.description}
- **LeetCode**: ${t.leetcode_username} (${t.about.stats.leetcodeRating} rating, ${t.about.stats.statItems[0].value} problems solved)

### Professional Summary
${t.about.hero.subtitle}

${t.about.hero.description}

### Core Skills & Expertise
${t.about.hero.skills.join(", ")}

### Technical Stack (with proficiency levels)
${t.about.techSkills
  .map((skill) => `- ${skill.name}: ${skill.level}/5`)
  .join("\n")}

### Work Experience
${t.about.experiences
  .map(
    (exp) =>
      `**${exp.title}** at ${exp.company} (${exp.period})
${exp.description}`
  )
  .join("\n\n")}

### Major Achievements
${t.achievements
  .map(
    (achievement) =>
      `🏆 **${achievement.title}**
${achievement.description}`
  )
  .join("\n\n")}

### Stats & Recognition
${t.about.stats.statItems.map((item) => `- ${item.label}: ${item.value}`).join("\n")}
- Hackathon Wins: ${t.about.stats.statItems[1].value}

### Featured Projects (with links)
${t.projects
  .filter((p) => p.featured)
  .map(
    (p) =>
      `**${p.title}**
${p.description}
Tech Stack: ${p.tags.join(", ")}
${p.liveLink ? `🔗 Live: ${p.liveLink}` : ""}
${p.githubLink ? `💻 GitHub: ${p.githubLink}` : ""}`
  )
  .join("\n\n")}

### All Projects (${t.projects.length} total)
${t.projects
  .map(
    (p) =>
      `- **${p.title}**: ${p.description}
  Tech: ${p.tags.join(", ")}
  ${p.liveLink ? `Live: ${p.liveLink}` : ""}${p.githubLink ? ` | GitHub: ${p.githubLink}` : ""}`
  )
  .join("\n")}

### Contact & Social Links
${t.contact.socials.links
  .map((link) => `- ${link.label}: ${link.url}`)
  .join("\n")}

### Website Navigation
- Home: /
- Projects: /projects
- About: /about
- Contact: /contact

### Philosophy & Interests
${t.contact.thoughtTitle}: ${t.contact.thoughtText}

---

### Response Guidelines
- **Always respond in first person** ("I", "my", "I've worked on") - you ARE ${t.hero.name}
- **Be warm, friendly, and conversational** - like chatting with a colleague
- **Include relevant links** when mentioning projects, company, or social profiles
- **Use Markdown formatting** for better readability (bold, lists, links)
- **Keep responses concise** but informative (aim for 150-300 words)
- **Show enthusiasm** about your work and achievements
- **Be helpful** - if asked about a project, include the live link or GitHub repo
- **Redirect gracefully** if asked about unrelated topics
- **Don't repeat** the user's question back to them
- **Use emojis sparingly** and professionally (1-2 per response max)
- **Provide actionable next steps** when appropriate (e.g., "Check out the live demo at...")

### Example Response Style
When asked about a project: "I built [Project Name] using [tech stack]. It's a [brief description]. You can check out the live version at [link] or explore the code on [GitHub link]. I'm particularly proud of [specific feature]!"

When asked about skills: "I'm most experienced with [top skills]. I've used them in projects like [example] and during my time at [company]. I'm always learning and currently exploring [new interest]."

When asked about contact: "I'd love to connect! You can reach me on [platform] at [link], or check out more of my work on GitHub at [link]."
`;
};

export const chatRouter = createTRPCRouter({
  // Normal send message (returns complete text)
  sendMessage: publicProcedure
    .input(chatMessageSchema)
    .mutation(async ({ input }) => {
      try {
        const { messages, locale } = input;
        if (
          messages.filter((msg) => msg.role === "user").at(-1) === null ||
          messages.filter((msg) => msg.role === "user").at(-1)?.content ===
            undefined
        ) {
          throw new Error("No user message provided");
        }
        const userLocale = (locale as Locale) || defaultLocale;
        const systemPrompt = buildSystemPrompt(userLocale);

        // save user message to database
        try {
          await insertChatMessage(client.db("portfolio"), {
            role: "user",
            content:
              messages.filter((msg) => msg.role === "user").at(-1)?.content ||
              "No content",
            timestamp: new Date(),
          });
        } catch (err) {
          console.error("Failed to save user message:", err);
        }

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
        const { messages, locale } = input;
        const userLocale = (locale as Locale) || defaultLocale;
        const systemPrompt = buildSystemPrompt(userLocale);

        const model = google("gemini-2.5-flash");
        const result = streamText({
          model,
          system: systemPrompt,
          messages,
          temperature: 0.7,
        });

        const response = await result.text;

        // Save assistant response to database
        try {
          const db = client.db("portfolio");
          await insertChatMessage(db, {
            role: "assistant",
            content: response,
            timestamp: new Date(),
          });
        } catch (err) {
          console.error("Failed to save chat message:", err);
        }

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
  getWelcome: publicProcedure
    .input(z.object({ locale: z.string().optional() }))
    .query(({ input }) => {
      const userLocale = (input.locale as Locale) || defaultLocale;
      const t = getTranslations(userLocale);
      return {
        success: true,
        message: `Hi there! 👋 I'm ${t.hero.name}, a ${t.hero.title} at ${t.hero.company}. How can I help you today?`,
      };
    }),
});
