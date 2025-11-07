export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
};

export type ConversationItem = { role: ChatMessage["role"]; content: string };
