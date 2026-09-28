"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { ArrowUp, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function Chat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading =
    status === "submitted" || status === "streaming";

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const text = input.trim();

    if (!text || isLoading) {
      return;
    }

    setInput("");

    await sendMessage({
      text,
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-8">
          {messages.length === 0 ? (
            <div className="flex min-h-[50vh] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
                  AI
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                  How can I help you?
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Ask me anything to get started.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      message.role === "user"
                        ? "max-w-[80%] rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground"
                        : "max-w-[80%] text-sm leading-7"
                    }
                  >
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <div key={index} className="whitespace-pre-wrap">
                            {part.text}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
              ))}

              {status === "submitted" && (
                <ThinkingIndicator />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-background/95 p-4 backdrop-blur">
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-3xl"
        >
          <div className="relative rounded-2xl border bg-muted/30 shadow-sm focus-within:ring-1 focus-within:ring-ring">
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Message AI Workspace..."
              className="min-h-[60px] resize-none border-0 bg-transparent px-4 py-4 pr-14 shadow-none focus-visible:ring-0"
              disabled={isLoading}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault();

                  event.currentTarget.form?.requestSubmit();
                }
              }}
            />

            <div className="absolute bottom-2 right-2">
              {isLoading ? (
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={() => stop()}
                  aria-label="Stop generating"
                >
                  <Square className="size-3.5 fill-current" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim()}
                  aria-label="Send message"
                >
                  <ArrowUp className="size-4" />
                </Button>
              )}
            </div>
          </div>

          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            AI can make mistakes. Check important information.
          </p>
        </form>
      </div>
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="flex gap-1">
        <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-current" />
      </div>

      <span>Thinking...</span>
    </div>
  );
}