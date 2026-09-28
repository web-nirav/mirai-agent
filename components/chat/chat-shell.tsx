"use client";

import { useState } from "react";

import { Chat } from "@/components/chat/chat";
import { ChatSidebar } from "@/components/sidebar/chat-sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function ChatShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNewChat = () => {
    window.location.reload();
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <ChatSidebar
        collapsed={sidebarCollapsed}
        onToggle={() =>
          setSidebarCollapsed((value) => !value)
        }
        onNewChat={handleNewChat}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold tracking-tight">
              New conversation
            </h1>

            <p className="hidden text-xs text-muted-foreground sm:block">
              AI Workspace
            </p>
          </div>

          <ThemeToggle />
        </header>

        <Chat />
      </main>
    </div>
  );
}