"use client";

import {
  Check,
  Copy,
  Loader2,
  MessageCircle,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { Action, Actions } from "@/components/ai-elements/actions";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ai-elements/message";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { en } from "@/data/en";
import { cn } from "@/lib/utils";
import { trpc } from "@/server/client";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi 👋 I'm ${en.hero.name}, your AI assistant. How can I help?`,
      timestamp: new Date(),
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        },
      ]);
    },
    onError: () => {
      toast.error("Failed to send message");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'm having trouble responding right now. Try again later.",
          timestamp: new Date(),
        },
      ]);
    },
  });

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, sendMessageMutation.isPending]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || sendMessageMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const conversation = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));
    await sendMessageMutation.mutateAsync({ messages: conversation });
  };

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success("Copied");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([messages[0]]);
    toast.success("Chat cleared");
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {isOpen ? (
        <Card
          className={cn(
            "w-[calc(100vw-32px)] sm:w-[380px] h-[500px]",
            "flex flex-col border border-border bg-background/60 backdrop-blur-xl rounded-2xl shadow-lg py-0",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">
                AI
              </div>
              <div>
                <h3 className="font-semibold text-sm">{en.hero.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {sendMessageMutation.isPending ? "Typing..." : "Online"}
                </p>
              </div>
            </div>
            <Actions>
              <Action
                tooltip="Clear"
                onClick={handleClear}
                disabled={messages.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Action>
              <Action tooltip="Close" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Action>
            </Actions>
          </div>

          {/* Messages */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
            {messages.map((m) => (
              <Message key={m.id} from={m.role}>
                <MessageAvatar
                  src={m.role === "user" ? "/user.png" : "/profile.jpg"}
                  name={m.role === "assistant" ? en.hero.name : "You"}
                />
                <MessageContent
                  variant="contained"
                  className={cn(
                    "text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 border border-border",
                  )}
                >
                  {m.role === "assistant" ? (
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  ) : (
                    <p>{m.content}</p>
                  )}
                </MessageContent>
                {m.role === "assistant" && (
                  <Actions>
                    <Action
                      tooltip="Copy"
                      onClick={() => handleCopy(m.content, m.id)}
                    >
                      {copiedId === m.id ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Action>
                  </Actions>
                )}
              </Message>
            ))}

            {sendMessageMutation.isPending && (
              <Message from="assistant">
                <MessageAvatar src="/profile.jpg" name={en.hero.name} />
                <MessageContent
                  variant="contained"
                  className="bg-muted/50 border border-border"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                </MessageContent>
              </Message>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t flex gap-2 items-end"
          >
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-xl bg-muted/30 border border-border focus-visible:ring-1 focus-visible:ring-primary"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || sendMessageMutation.isPending}
              className="rounded-xl"
            >
              {sendMessageMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:scale-105 transition-transform"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
