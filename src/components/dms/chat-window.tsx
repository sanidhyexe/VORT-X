
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MoreVertical, Phone, Video, User as UserIcon, Archive, Trash2, ChevronLeft, Gamepad2, Paperclip, Smile } from "lucide-react";
import { Conversation, User } from "./chat-layout";
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import CallDialog from './call-dialog';

interface ChatWindowProps {
    conversation: Conversation;
    onSendMessage: (message: string) => void;
    onBack: () => void;
    currentUser: User;
}

export default function ChatWindow({ conversation, onSendMessage, onBack, currentUser }: ChatWindowProps) {
    const [message, setMessage] = useState("");
    const { toast } = useToast();
    const [isCalling, setIsCalling] = useState(false);
    const [callType, setCallType] = useState<'voice' | 'video'>('voice');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage("");
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    }

    const handleCallAction = (type: 'voice' | 'video') => {
        setCallType(type);
        setIsCalling(true);
    }
    
    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex items-center gap-4 p-3 border-b bg-secondary/50">
                 <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack}>
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
                    <AvatarFallback>{conversation.participant.name.substring(0,2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold break-words">{conversation.participant.name}</p>
                    {conversation.context ? (
                         <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Gamepad2 className="h-3 w-3" />
                            <span className='truncate'>{conversation.context}</span>
                         </div>
                    ) : (
                        <p className="text-xs text-green-400">{conversation.participant.online ? 'Online' : 'Offline'}</p>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleCallAction('voice')}><Phone className="h-5 w-5 text-muted-foreground"/></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleCallAction('video')}><Video className="h-5 w-5 text-muted-foreground"/></Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5 text-muted-foreground"/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                             <Link href="/profile">
                                <DropdownMenuItem>
                                    <UserIcon className="mr-2 h-4 w-4" />
                                    <span>View Profile</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => toast({ title: 'Chat archived!'})}>
                                <Archive className="mr-2 h-4 w-4" />
                                <span>Archive Chat</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => toast({ title: 'Chat deleted!', variant: 'destructive'})}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete Chat</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1">
                <div className="p-4 lg:p-6 space-y-2">
                    {conversation.messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex items-end gap-2 max-w-[75%]",
                                msg.sender.id === currentUser.id ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                             <Avatar className={cn("h-8 w-8", msg.sender.id === currentUser.id && "hidden")}>
                                <AvatarImage src={msg.sender.avatar} alt={msg.sender.name} />
                                <AvatarFallback>{msg.sender.name.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <div
                                className={cn(
                                    "relative p-3 rounded-xl shadow-sm",
                                    msg.sender.id === currentUser.id
                                        ? "bg-primary text-primary-foreground chat-bubble-sent"
                                        : "bg-secondary chat-bubble-received"
                                )}
                            >
                                <p className="text-base break-all">{msg.content}</p>
                                <p className="text-xs text-right mt-1 opacity-70">{msg.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            
            {/* Chat Input */}
            <div className="p-3 border-t bg-secondary/50">
                 <div className="relative flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="shrink-0">
                        <Smile className="h-5 w-5 text-muted-foreground"/>
                    </Button>
                     <Button variant="ghost" size="icon" className="shrink-0">
                        <Paperclip className="h-5 w-5 text-muted-foreground"/>
                    </Button>
                    <Input
                        placeholder="Type a message..."
                        className="flex-1 bg-background"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <Button
                        size="icon"
                        className="h-10 w-10 shrink-0"
                        onClick={handleSend}
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {isCalling && (
                <CallDialog 
                    isOpen={isCalling}
                    onClose={() => setIsCalling(false)}
                    user={conversation.participant}
                    callType={callType}
                />
            )}
        </div>
    )
}
