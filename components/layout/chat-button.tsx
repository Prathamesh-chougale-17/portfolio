"use client";

import {
  Check,
  Copy,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
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
  const [isPulsing, setIsPulsing] = useState(false);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi there! 👋 I'm ${en.hero.name}, a ${en.hero.title} at ${en.hero.company}. I'm here to answer your questions about my experience, projects, and skills. How can I help you today?`,
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
    onError: (error) => {
      toast.error(error.message || "Failed to send message");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble responding right now. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    },
  });

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, sendMessageMutation.isPending]);

  // Pulse animation every 30 seconds
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 2000);
      }, 30000);

      const timeout = setTimeout(() => {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 2000);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isOpen]);

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

    // Send message with full conversation context
    const conversationMessages = [...messages, userMessage].map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    await sendMessageMutation.mutateAsync({
      messages: conversationMessages,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !sendMessageMutation.isPending) {
        handleSubmit(e as any);
      }
    }
  };

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success("Message copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Hi there! 👋 I'm ${en.hero.name}, a ${en.hero.title} at ${en.hero.company}. I'm here to answer your questions about my experience, projects, and skills. How can I help you today?`,
        timestamp: new Date(),
      },
    ]);
    toast.success("Chat cleared");
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {isOpen ? (
        <Card
          className={cn(
            "w-[calc(100vw-32px)] sm:w-[400px] md:w-[450px] h-[500px] sm:h-[600px]",
            "flex flex-col shadow-2xl border-2",
            "bg-gradient-to-br from-background via-background to-muted/20",
            "animate-in slide-in-from-bottom-5 fade-in-0 duration-300",
            "backdrop-blur-xl",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-primary/80 h-10 w-10 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div>
                <h3 className="font-semibold text-base">
                  {en.hero.name.split(" ")[0]}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {sendMessageMutation.isPending
                    ? "Typing..."
                    : "AI Assistant • Online"}
                </p>
              </div>
            </div>
            <Actions>
              <Action
                tooltip="Clear chat"
                onClick={handleClear}
                disabled={messages.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Action>
              <Action tooltip="Close chat" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Action>
            </Actions>
          </div>

          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
          >
            {messages.map((message) => (
              <Message
                key={message.id}
                from={message.role}
                className={cn(
                  "animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
                )}
              >
                <MessageAvatar
                  src={
                    message.role === "user"
                      ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                      : "https://api.dicebear.com/7.x/bottts/svg?seed=ai"
                  }
                  name={message.role === "assistant" ? en.hero.name : "You"}
                />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <MessageContent
                    variant="contained"
                    className={cn(
                      "shadow-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/80 backdrop-blur",
                    )}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0">{children}</p>
                            ),
                            ul: ({ children }) => (
                              <ul className="mb-2 ml-4">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-2 ml-4">{children}</ol>
                            ),
                            li: ({ children }) => (
                              <li className="mb-1">{children}</li>
                            ),
                            code: ({ children, className }) => {
                              const isInline = !className;
                              return isInline ? (
                                <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-xs">
                                  {children}
                                </code>
                              ) : (
                                <code className={className}>{children}</code>
                              );
                            },
                            a: ({ children, href }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    )}
                  </MessageContent>
                  {message.role === "assistant" && (
                    <Actions className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Action
                        tooltip="Copy message"
                        onClick={() => handleCopy(message.content, message.id)}
                      >
                        {copiedId === message.id ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Action>
                    </Actions>
                  )}
                </div>
              </Message>
            ))}

            {/* Loading Indicator */}
            {sendMessageMutation.isPending && (
              <Message from="assistant" className="animate-in fade-in-0">
                <MessageAvatar
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=ai"
                  name={en.hero.name}
                />
                <MessageContent variant="contained" className="bg-muted/80">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Thinking...
                    </span>
                  </div>
                </MessageContent>
              </Message>
            )}
          </div>

          {/* Input Form */}
          <div className="p-4 border-t bg-muted/30 backdrop-blur">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className={cn(
                    "min-h-[44px] max-h-[120px] resize-none pr-10",
                    "focus-visible:ring-2 focus-visible:ring-primary/50",
                    "bg-background/80 backdrop-blur",
                  )}
                  disabled={sendMessageMutation.isPending}
                  rows={1}
                  maxLength={500}
                />
                {input.length > 0 && (
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {input.length}/500
                  </div>
                )}
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || sendMessageMutation.isPending}
                className={cn(
                  "h-11 w-11 rounded-xl cursor-pointer shadow-lg",
                  "bg-gradient-to-br from-primary to-primary/80",
                  "hover:scale-105 active:scale-95 transition-all",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                )}
              >
                {sendMessageMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press{" "}
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">
                Enter
              </kbd>{" "}
              to send,{" "}
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">
                Shift + Enter
              </kbd>{" "}
              for new line
            </p>
          </div>
        </Card>
      ) : (
        <div className="relative group">
          <Button
            onClick={() => setIsOpen(true)}
            size="icon"
            className={cn(
              "h-14 w-14 rounded-full cursor-pointer shadow-2xl",
              "bg-gradient-to-br from-primary via-primary to-primary/80",
              "hover:scale-110 active:scale-95 transition-all duration-300",
              "border-2 border-primary-foreground/20",
            )}
            aria-label="Open AI chat"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>

          {/* Pulse Animation */}
          {isPulsing && (
            <>
              <span className="absolute inset-0 rounded-full animate-ping bg-primary/75 opacity-75"></span>
              <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-50 animation-delay-150"></span>
            </>
          )}

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-popover text-popover-foreground text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap border border-border">
              Chat with {en.hero.name}
            </div>
          </div>

          {/* Badge for new visitors */}
          <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-[10px] font-bold text-primary-foreground shadow-lg animate-bounce">
            AI
          </div>
        </div>
      )}
    </div>
  );
}
