# AI Chatbot with tRPC + AI SDK Integration Guide

This portfolio now features a beautiful AI-powered chatbot that uses **tRPC**, **Vercel AI SDK**, and **Google Gemini** for intelligent, streaming conversations.

## 📦 Installation

Install all required dependencies using Bun:

```bash
bun add ai @ai-sdk/google
```

All other dependencies (tRPC, TanStack Query, React Markdown) are already installed.

## 🏗️ Architecture Overview

### The Stack

- **tRPC**: Type-safe API layer for all backend communication
- **Vercel AI SDK**: Handles AI model interactions (Google Gemini)
- **TanStack Query**: Built into tRPC for state management and caching
- **React Markdown**: Renders formatted AI responses
- **Custom UI Components**: Beautiful message bubbles and actions

### File Structure

```
portfolio/
├── server/
│   └── routers/
│       └── chat.ts              # tRPC chat router with AI SDK
├── components/
│   ├── layout/
│   │   └── chat-button.tsx      # Main chat UI component
│   └── ai-elements/
│       ├── message.tsx          # Message display components
│       └── actions.tsx          # Action buttons (copy, clear, etc.)
└── data/
    └── lang.ts                    # Portfolio data for AI context
```

## 🎯 How It Works

### 1. User sends a message

```tsx
// Client-side (chat-button.tsx)
const sendMessageMutation = trpc.chat.sendMessage.useMutation({
  onSuccess: (data) => {
    // Add AI response to messages
    setMessages([...messages, { role: "assistant", content: data.response }]);
  },
});
```

### 2. tRPC routes to AI handler

```typescript
// Server-side (server/routers/chat.ts)
sendMessage: publicProcedure
  .input(chatMessageSchema)
  .mutation(async ({ input }) => {
    const result = await streamText({
      model: google("gemini-2.0-flash-exp"),
      system: systemPrompt,
      messages: input.messages,
    });

    return { success: true, response: await result.text };
  });
```

### 3. AI generates response

The AI SDK communicates with Google Gemini using your portfolio context, generating personalized responses.

### 4. Response streams back to client

tRPC sends the complete response back, and the UI updates with the AI message.

## 🚀 Features

### Beautiful UI

- ✨ Glassmorphism effects with gradient backgrounds
- 💬 Animated message bubbles
- 👤 User and AI avatars
- 🎨 Dark mode support
- 📱 Fully responsive (mobile & desktop)
- 💫 Smooth animations and transitions

### Smart AI

- 🧠 Context-aware about your portfolio
- 📚 Knows your experience, skills, and projects
- 💬 Natural, conversational responses
- 📝 Markdown formatting support
- 🔗 Clickable links
- 💻 Code syntax highlighting

### User Experience

- ⌨️ Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- 📋 Copy messages to clipboard
- 🗑️ Clear chat history
- 🔄 Loading indicators
- 🎯 Character count (500 max)
- 💡 Helpful hints
- 🟢 Online status indicator
- 🔔 Pulse animation to attract attention

### Developer Experience

- 🔒 Full type safety end-to-end
- 🚀 Fast with tRPC batching
- 🎯 Single source of truth for API
- 🛠️ Easy to extend and maintain
- 📊 Built-in error handling
- ⚡ Optimistic UI updates

## 🔧 Configuration

### Environment Variables

Add to your `.env.local`:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key-here
```

**Get your API key:**

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the key and add it to `.env.local`
5. Restart your dev server

### Customize AI Behavior

Edit `server/routers/chat.ts`:

```typescript
// Change the AI model
model: google("gemini-2.0-flash-exp"); // Fast & latest
// or
model: google("gemini-1.5-pro"); // More capable
// or
model: google("gemini-1.5-flash"); // Stable

// Adjust creativity
temperature: 0.7; // Balanced (0.0 = factual, 1.0 = creative)

// Limit response length
maxTokens: 1000; // ~750 words
```

### Customize System Prompt

The system prompt gives the AI context about your portfolio:

```typescript
const systemPrompt = `You are ${en.hero.name}, a ${en.hero.title}...
- Include relevant portfolio data
- Set the tone and style
- Define response guidelines
`;
```

### Customize UI Appearance

In `components/layout/chat-button.tsx`:

```tsx
// Chat window size
className = "w-[400px] h-[600px]"; // Adjust dimensions

// Colors
className = "bg-gradient-to-br from-primary..."; // Button gradient
className = "bg-primary text-primary-foreground"; // User messages
className = "bg-muted/80 backdrop-blur"; // AI messages

// Animations
className = "animate-in slide-in-from-bottom-5"; // Entry animation
```

## 📝 API Reference

### tRPC Chat Router

#### `chat.sendMessage`

Send a message and get AI response.

```typescript
const mutation = trpc.chat.sendMessage.useMutation();

mutation.mutate({
  messages: [
    { role: "user", content: "Tell me about your experience" },
    { role: "assistant", content: "I have 5 years of..." },
    { role: "user", content: "What technologies do you use?" },
  ],
});
```

**Input:**

```typescript
{
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
}
```

**Output:**

```typescript
{
  success: boolean;
  response: string;
  id: string;
}
```

#### `chat.getWelcome`

Get the initial welcome message.

```typescript
const { data } = trpc.chat.getWelcome.useQuery();
// { success: true, message: "Hi there! 👋..." }
```

## 🎨 UI Components Reference

### Message Component

```tsx
import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/message";

<Message from="user" | "assistant">
  <MessageAvatar src="/avatar.png" name="John" />
  <MessageContent variant="contained">
    Message text here
  </MessageContent>
</Message>
```

**Props:**

- `from`: `"user" | "assistant"` - Determines message alignment and styling
- `variant`: `"contained" | "flat"` - Message bubble style

### Actions Component

```tsx
import { Actions, Action } from "@/components/ai-elements/actions";

<Actions>
  <Action tooltip="Copy" onClick={handleCopy}>
    <Copy className="h-4 w-4" />
  </Action>
  <Action tooltip="Delete" onClick={handleDelete}>
    <Trash className="h-4 w-4" />
  </Action>
</Actions>;
```

**Props:**

- `tooltip`: String to show on hover
- `onClick`: Click handler function
- `disabled`: Optional boolean to disable action

## 🔄 Message Flow

```
User types message
        ↓
Click Send / Press Enter
        ↓
Add to local messages array (optimistic update)
        ↓
Send via tRPC mutation
        ↓
Server receives message
        ↓
AI SDK calls Google Gemini
        ↓
Gemini generates response
        ↓
Response sent back through tRPC
        ↓
Add AI response to messages array
        ↓
UI updates with new message
```

## 💡 Usage Examples

### Basic Usage

The chat button is already integrated in your layout. Users can:

1. Click the floating AI button (bottom-right)
2. Type their question
3. Press Enter or click Send
4. See the AI response
5. Continue the conversation

### Programmatic Usage

```tsx
// Send a message programmatically
const sendMessage = trpc.chat.sendMessage.useMutation();

await sendMessage.mutateAsync({
  messages: [{ role: "user", content: "Hello!" }],
});
```

### With Loading State

```tsx
const mutation = trpc.chat.sendMessage.useMutation();

{
  mutation.isPending && <Loader2 className="animate-spin" />;
}
{
  mutation.isError && <p>Error: {mutation.error.message}</p>;
}
{
  mutation.isSuccess && <p>Success!</p>;
}
```

### With Toast Notifications

```tsx
import { toast } from "sonner";

const mutation = trpc.chat.sendMessage.useMutation({
  onSuccess: () => toast.success("Message sent!"),
  onError: (error) => toast.error(error.message),
});
```

## 🎯 Best Practices

### 1. Context Management

Keep conversation context but limit history to last 10 messages to reduce token usage:

```typescript
const recentMessages = messages.slice(-10);
```

### 2. Error Handling

Always handle errors gracefully:

```typescript
try {
  await mutation.mutateAsync(data);
} catch (error) {
  toast.error("Failed to send message. Please try again.");
}
```

### 3. Input Validation

Validate user input before sending:

```typescript
if (!input.trim()) return;
if (input.length > 500) {
  toast.error("Message too long");
  return;
}
```

### 4. Rate Limiting

Consider implementing rate limiting to prevent abuse:

```typescript
// In tRPC middleware
if (messageCount > 10) {
  throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
}
```

## 🐛 Troubleshooting

### "API key not valid" error

**Solution:**

- Check `GOOGLE_GENERATIVE_AI_API_KEY` in `.env.local`
- Ensure no extra spaces or quotes
- Restart dev server: `bun run dev`
- Verify key at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Messages not appearing

**Solution:**

- Check browser console for errors
- Verify tRPC is properly set up
- Ensure `TRPCProvider` wraps your app in `layout.tsx`
- Check network tab for failed requests

### Markdown not rendering

**Solution:**

- Ensure `react-markdown` is installed: `bun add react-markdown`
- Check ReactMarkdown component configuration
- Verify message content is valid markdown

### Slow responses

**Solution:**

- Switch to faster model: `gemini-2.0-flash-exp`
- Reduce `maxTokens` setting
- Limit conversation context
- Check your internet connection

### tRPC errors

**Solution:**

- Check server console for detailed errors
- Verify API route at `/api/trpc/[trpc]/route.ts`
- Ensure all tRPC dependencies are installed
- Clear `.next` cache and rebuild

## 🚀 Advanced Features

### Add Chat History Persistence

```typescript
// In server/routers/chat.ts
import client from "@/db/client";

sendMessage: publicProcedure
  .input(chatMessageSchema)
  .mutation(async ({ input }) => {
    // Save to database
    await db.collection("chats").insertOne({
      messages: input.messages,
      timestamp: new Date(),
    });

    // Generate response...
  });
```

### Add Streaming Responses

For real-time streaming (advanced):

```typescript
// Use tRPC subscriptions
stream: publicProcedure
  .input(chatMessageSchema)
  .subscription(async function* ({ input }) {
    const result = streamText({
      /* ... */
    });

    for await (const chunk of result.textStream) {
      yield { text: chunk };
    }
  });
```

### Add Function Calling

Extend AI capabilities with tools:

```typescript
const result = await streamText({
  model: google("gemini-2.0-flash-exp"),
  tools: {
    getProjects: {
      description: "Get portfolio projects",
      execute: async () => en.projects,
    },
  },
  // ...
});
```

### Add Rate Limiting

```typescript
// Install: bun add upstash-ratelimit @upstash/redis

import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 m"),
});

// In mutation
const { success } = await ratelimit.limit(userId);
if (!success) throw new Error("Rate limit exceeded");
```

## 📊 Monitoring & Analytics

### Track Token Usage

```typescript
const result = await streamText({
  /* ... */
});

console.log("Tokens used:", {
  prompt: result.usage?.promptTokens,
  completion: result.usage?.completionTokens,
  total: result.usage?.totalTokens,
});
```

### Track Popular Questions

```typescript
await db.collection("analytics").insertOne({
  question: input.messages[input.messages.length - 1].content,
  timestamp: new Date(),
});
```

## 🔐 Security Considerations

1. **API Key Protection**

   - Never expose your API key client-side
   - Use environment variables only
   - Rotate keys regularly

2. **Rate Limiting**

   - Implement per-user rate limits
   - Monitor usage patterns
   - Set up alerts for abuse

3. **Input Validation**

   - Sanitize user inputs
   - Limit message length
   - Block malicious content

4. **Context Injection**
   - Be careful with user-provided context
   - Sanitize portfolio data
   - Use prepared prompts

## 📚 Resources

- [tRPC Documentation](https://trpc.io/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Google Gemini API](https://ai.google.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Markdown](https://github.com/remarkjs/react-markdown)

## ✅ Checklist

- [x] Install AI SDK dependencies
- [x] Set up tRPC chat router
- [x] Create chat UI component
- [x] Add message components
- [x] Configure Gemini API
- [x] Add markdown rendering
- [x] Implement error handling
- [x] Add loading states
- [x] Style with Tailwind
- [x] Make responsive
- [x] Add dark mode support
- [x] Test on mobile
- [x] Add keyboard shortcuts
- [x] Implement copy functionality

## 🎉 Summary

You now have a production-ready AI chatbot that:

- ✅ Uses tRPC for type-safe communication
- ✅ Powered by Google Gemini 2.0 Flash
- ✅ Beautiful, modern UI with animations
- ✅ Context-aware about your portfolio
- ✅ Supports markdown and code highlighting
- ✅ Works perfectly on all devices
- ✅ Fully integrated with your tech stack

The chatbot provides an engaging, interactive way for visitors to learn about your experience, projects, and skills!

---

**Built with ❤️ using tRPC, Vercel AI SDK, and Google Gemini**

Need help? Check the troubleshooting section or open an issue on GitHub.
