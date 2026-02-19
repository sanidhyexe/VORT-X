
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search, UserPlus, ArrowLeft } from "lucide-react";
import { Conversation } from "./chat-layout";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';

interface ConversationListProps {
    conversations: Conversation[];
    selectedConversation: Conversation | null;
    onConversationSelect: (conversation: Conversation) => void;
}

export default function ConversationList({ conversations, selectedConversation, onConversationSelect }: ConversationListProps) {
    const router = useRouter();
    
    return (
        <>
            <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-4">
                     <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5 text-muted-foreground"/>
                        </Button>
                        <h2 className="text-2xl font-bold">Chats</h2>
                    </div>
                    <Button variant="ghost" size="icon">
                        <UserPlus className="h-5 w-5 text-muted-foreground"/>
                    </Button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search or start new chat" className="pl-9" />
                </div>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-2 space-y-0.5">
                    {conversations.map((convo) => (
                        <button
                            key={convo.id}
                            onClick={() => onConversationSelect(convo)}
                            className={cn(
                                "flex w-full items-center gap-3 p-3 rounded-lg text-left transition-colors duration-150",
                                selectedConversation?.id === convo.id
                                    ? "bg-accent/60"
                                    : "hover:bg-accent/10"
                            )}
                        >
                            <div className="relative">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={convo.participant.avatar} alt={convo.participant.name} data-ai-hint="gamer avatar"/>
                                    <AvatarFallback>{convo.participant.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                {convo.participant.online && (
                                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0 border-b border-border/50 pb-3">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold truncate">{convo.participant.name}</p>
                                    <p className="text-xs text-muted-foreground shrink-0 ml-2">{convo.lastMessageTime}</p>
                                </div>
                                <div className="flex justify-between items-start mt-1">
                                    <p className={cn(
                                        "text-sm text-muted-foreground line-clamp-1",
                                        convo.unreadCount > 0 && "font-bold text-foreground"
                                    )}>
                                        {convo.lastMessage}
                                    </p>
                                    {convo.unreadCount > 0 && (
                                        <span className="flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 font-bold shrink-0 ml-2">
                                            {convo.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </ScrollArea>
        </>
    );
}
