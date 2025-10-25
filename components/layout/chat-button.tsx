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
import Image from "next/image";
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
import { Shimmer } from "../ai-elements/shimmer";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi 👋 I'm ${en.hero.name}, your AI assistant. I love building scalable web applications and have won 5+ hackathons! Ask me about my projects, tech stack, or anything else you'd like to know. How can I help?`,
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
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, sendMessageMutation.isPending]);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim() || sendMessageMutation.isPending) {
      return;
    }

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
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {isOpen ? (
        <Card
          className={cn(
            "h-[500px] w-[calc(100vw-32px)] sm:w-[380px]",
            "flex flex-col rounded-2xl border border-border bg-background/60 py-0 shadow-lg backdrop-blur-xl"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b p-3">
            <div className="flex items-center gap-2">
              <Image
                alt={en.hero.name}
                className="rounded-full"
                height={32}
                src="/icons/android-chrome-192x192.png"
                width={32}
              />
              <div>
                <h3 className="font-semibold text-sm">{en.hero.name}</h3>
                <p className="text-muted-foreground text-xs">
                  {sendMessageMutation.isPending ? "Typing..." : "Online"}
                </p>
              </div>
            </div>
            <Actions>
              <Action
                disabled={messages.length <= 1}
                onClick={handleClear}
                tooltip="Clear"
              >
                <Trash2 className="h-4 w-4" />
              </Action>
              <Action onClick={() => setIsOpen(false)} tooltip="Close">
                <X className="h-4 w-4" />
              </Action>
            </Actions>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
            {messages.map((m) => (
              <Message from={m.role} key={m.id}>
                <MessageAvatar
                  name={m.role === "assistant" ? en.hero.name : "You"}
                  src={m.role === "user" ? "/user.png" : "/profile.jpg"}
                />
                <MessageContent
                  className={cn(
                    "text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-muted/50"
                  )}
                  variant="contained"
                >
                  {m.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        a: ({ href, children, ...props }) => (
                          <a
                            className="text-blue-600 underline transition-colors hover:text-blue-800 hover:no-underline"
                            href={href}
                            rel="noopener noreferrer"
                            target="_blank"
                            {...props}
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    <p>{m.content}</p>
                  )}
                </MessageContent>
                {m.role === "assistant" && (
                  <Actions>
                    <Action
                      onClick={() => handleCopy(m.content, m.id)}
                      tooltip="Copy"
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
                <MessageAvatar name={en.hero.name} src="/profile.jpg" />
                <MessageContent
                  className="border border-border bg-muted/50"
                  variant="contained"
                >
                  <Shimmer as="div">Ahh, let me think...</Shimmer>
                </MessageContent>
              </Message>
            )}
          </div>

          {/* Input */}
          <form
            className="flex items-end gap-2 border-t p-3"
            onSubmit={handleSubmit}
          >
            <Textarea
              className="flex-1 resize-none rounded-xl border border-border bg-muted/30 focus-visible:ring-1 focus-visible:ring-primary"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              placeholder="Type your message..."
              ref={inputRef}
              rows={1}
              value={input}
            />
            <Button
              className="rounded-xl"
              disabled={!input.trim() || sendMessageMutation.isPending}
              size="icon"
              type="submit"
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
          aria-label="Open chat"
          className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
          onClick={() => setIsOpen(true)}
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
