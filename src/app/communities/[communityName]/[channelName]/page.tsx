

'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Send, Hash, Paperclip, Smile, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCommunities, Message } from '@/context/community-context';
import Link from 'next/link';

const channelDescriptions: Record<string, string> = {
    'general-chat': 'General discussion about the game. Say hi!',
    'announcements': 'Important updates and news from community admins.',
    'looking-for-group': 'Find teammates for your next match.',
    'strategies': 'Share tips, tricks, and strategies.',
    'off-topic': 'For everything else not related to the game.',
};

export default function CommunityChannelPage() {
    const params = useParams();
    const communityName = decodeURIComponent(params.communityName as string);
    const channelName = decodeURIComponent(params.channelName as string);
    const prettyChannelName = channelName.replace(/-/g, ' ');
    const description = channelDescriptions[channelName] || 'Welcome to the channel!';
    const currentUser = { name: "YUV-X" };

    const { getMessages, addMessage } = useCommunities();
    const messages = getMessages(communityName, channelName);
    
    const [newMessage, setNewMessage] = useState('');
    
    const initialMessages: Message[] = messages.length === 0 ? [
        {
            id: 1,
            author: 'VORT-X Bot',
            avatar: 'https://placehold.co/40x40.png',
            avatarHint: 'bot avatar',
            content: `Welcome to the #${prettyChannelName} channel in the ${communityName} community! Feel free to discuss anything relevant to this channel. Be respectful and have fun!`,
            isCurrentUser: false,
        }
    ] : [];

    const displayMessages = [...initialMessages, ...messages];

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message = {
            author: currentUser.name,
            avatar: 'https://placehold.co/128x128.png',
            avatarHint: 'esports player avatar',
            content: newMessage.trim(),
            isCurrentUser: true,
        };

        addMessage(communityName, channelName, message);
        setNewMessage('');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    }

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <div className="p-3 border-b flex items-center gap-3 bg-secondary/50 h-14">
                <Hash className="h-6 w-6 text-muted-foreground" />
                <div className='flex-1'>
                    <h1 className="text-lg font-bold capitalize break-words">{prettyChannelName}</h1>
                    <p className="text-sm text-muted-foreground break-words truncate">{description}</p>
                </div>
            </div>

            {/* Message Area */}
            <ScrollArea className="flex-1">
                <div className="p-4 lg:p-6 space-y-2">
                    {displayMessages.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.isCurrentUser && "justify-end")}>
                            {!msg.isCurrentUser && (
                                <Avatar className="h-8 w-8 self-start">
                                    <AvatarImage src={msg.avatar} alt={msg.author} data-ai-hint={msg.avatarHint} />
                                    <AvatarFallback>{msg.author.substring(0,2)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn("relative max-w-lg rounded-lg px-3 py-2 shadow", 
                                msg.isCurrentUser 
                                ? "bg-primary text-primary-foreground chat-bubble-sent"
                                : "bg-secondary chat-bubble-received"
                            )}>
                                {!msg.isCurrentUser && (
                                    <p className="font-semibold text-sm text-primary">{msg.author}</p>
                                )}
                                <div className="text-base break-words">
                                    {msg.content.split(/(\[View Tournament\]\(\/tournaments\/\d+\))/).map((part, i) => {
                                        const match = part.match(/\[View Tournament\]\((\/tournaments\/\d+)\)/);
                                        if (match) {
                                            return <Button asChild variant="link" key={i} className="p-0 h-auto font-semibold"><Link href={match[1]}>View Tournament</Link></Button>
                                        }
                                        return part;
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            
            {/* Input Bar */}
            <div className="p-3 border-t bg-secondary/50">
                <div className="relative flex items-center gap-2">
                     <Button variant="ghost" size="icon" className="shrink-0">
                        <Smile className="h-5 w-5 text-muted-foreground"/>
                    </Button>
                     <Button variant="ghost" size="icon" className="shrink-0">
                        <Paperclip className="h-5 w-5 text-muted-foreground"/>
                    </Button>
                    <Input 
                        placeholder={`Message #${prettyChannelName}`} 
                        className="flex-1 bg-background"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <Button
                        size="icon"
                        className="h-10 w-10 shrink-0"
                        onClick={handleSendMessage}
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
