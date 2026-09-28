"use client";

import {
    ChevronLeft,
    ChevronRight,
    MessageSquare,
    Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Chat = {
    id: string;
    title: string;
};

const chats: Chat[] = [
    {
        id: "1",
        title: "Understanding AI SDK",
    },
    {
        id: "2",
        title: "React architecture discussion",
    },
    {
        id: "3",
        title: "Next.js project setup",
    },
];

type ChatSidebarProps = {
    collapsed: boolean;
    onToggle: () => void;
    onNewChat: () => void;
};

export function ChatSidebar({
    collapsed,
    onToggle,
    onNewChat,
}: ChatSidebarProps) {
    return (
        <aside
            className={cn(
                "relative flex h-full flex-col border-r bg-sidebar transition-[width] duration-200",
                collapsed ? "w-16" : "w-64",
            )}
        >
            {/* Header */}
            <div
                className={cn(
                    "flex h-14 items-center border-b px-3",
                    collapsed ? "justify-center" : "justify-between",
                )}
            >
                {!collapsed && (
                    <div className="flex items-center gap-2 px-2">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            AI
                        </div>

                        <span className="text-sm font-semibold tracking-tight">
                            AI Workspace
                        </span>
                    </div>
                )}

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggle}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? (
                        <ChevronRight className="size-4" />
                    ) : (
                        <ChevronLeft className="size-4" />
                    )}
                </Button>
            </div>

            {/* New Chat */}
            <div className="p-3">
                <Button
                    className={cn(
                        "w-full",
                        collapsed ? "justify-center px-0" : "justify-start",
                    )}
                    variant="outline"
                    onClick={onNewChat}
                >
                    <Plus className="size-4" />

                    {!collapsed && <span>New Chat</span>}
                </Button>
            </div>

            <Separator />

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto p-2">
                {!collapsed && (
                    <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                        Recent chats
                    </p>
                )}

                <div className="space-y-1">
                    {chats.map((chat) => (
                        <Button
                            key={chat.id}
                            variant="ghost"
                            className={cn(
                                "w-full",
                                collapsed
                                    ? "justify-center px-0"
                                    : "justify-start font-normal",
                            )}
                            title={collapsed ? chat.title : undefined}
                        >
                            <MessageSquare className="size-4 shrink-0" />

                            {!collapsed && (
                                <span className="truncate">{chat.title}</span>
                            )}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t p-3">
                {!collapsed && (
                    <p className="px-2 text-xs text-muted-foreground">
                        Conversations are not saved yet.
                    </p>
                )}
            </div>
        </aside>
    );
}