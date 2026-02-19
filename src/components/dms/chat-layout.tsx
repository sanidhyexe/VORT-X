
'use client';

import { cn } from "@/lib/utils";
import ConversationList from "./conversation-list";
import ChatWindow from "./chat-window";
import { User } from "./mock-data";

/**
 * @interface Message
 * @description Represents a single message within a conversation.
 * @property {number} id - Unique identifier for the message.
 * @property {User} sender - The user object of the person who sent the message.
 * @property {string} content - The text content of the message.
 * @property {string} timestamp - A formatted string representing when the message was sent.
 */
export interface Message {
    id: number;
    sender: User;
    content: string;
    timestamp: string;
}

/**
 * @interface Conversation
 * @description Represents a chat conversation between the current user and another participant.
 * @property {string} id - Unique identifier for the conversation.
 * @property {User} participant - The user object of the other participant in the conversation.
 * @property {Message[]} messages - An array of all messages in the conversation.
 * @property {string} lastMessage - The content of the most recent message.
 * @property {string} lastMessageTime - A formatted string for the time of the last message.
 * @property {number} unreadCount - The number of unread messages for the current user.
 * @property {string} [context] - Optional context for the conversation, e.g., a tournament name.
 */
export interface Conversation {
    id: string;
    participant: User;
    messages: Message[];
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    context?: string;
}

/**
 * @interface ChatLayoutProps
 * @description Props for the ChatLayout component.
 * @property {Conversation[]} conversations - Array of all conversations.
 * @property {Conversation | null} selectedConversation - The currently selected conversation to display.
 * @property {(conversation: Conversation) => void} onConversationSelect - Callback for when a conversation is selected.
 * @property {(message: string) => void} onSendMessage - Callback for sending a new message.
 * @property {User} currentUser - The user object for the currently logged-in user.
 */
interface ChatLayoutProps {
    conversations: Conversation[];
    selectedConversation: Conversation | null;
    onConversationSelect: (conversation: Conversation) => void;
    onSendMessage: (message: string) => void;
    currentUser: User;
}

/**
 * The main layout component for the Direct Messages page.
 * It arranges the conversation list and the chat window side-by-side.
 * @param {ChatLayoutProps} props - The props for the component.
 * @returns {JSX.Element} The rendered chat layout.
 */
export function ChatLayout({ conversations, selectedConversation, onConversationSelect, onSendMessage, currentUser }: ChatLayoutProps) {
    return (
        <div className="h-full w-full grid grid-cols-[1fr] md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr] overflow-hidden">
            <div className={cn(
                "h-full w-full flex flex-col border-r",
                selectedConversation && "hidden md:flex"
            )}>
                <ConversationList
                    conversations={conversations}
                    selectedConversation={selectedConversation}
                    onConversationSelect={onConversationSelect}
                />
            </div>
             <div className={cn(
                 "flex flex-col h-full bg-background overflow-hidden",
                 !selectedConversation && "hidden md:flex"
            )}>
                {selectedConversation ? (
                    <ChatWindow
                        conversation={selectedConversation}
                        onSendMessage={onSendMessage}
                        onBack={() => onConversationSelect(null as any)}
                        currentUser={currentUser}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-secondary/30">
                        <h2 className="text-xl font-medium text-muted-foreground">Select a conversation</h2>
                        <p className="text-muted-foreground">Choose a friend from the list to start chatting.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
