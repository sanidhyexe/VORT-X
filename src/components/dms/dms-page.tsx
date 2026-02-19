
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatLayout, type Conversation } from './chat-layout';
import { mockConversations, mockUsers } from './mock-data';
import BottomNav from '../layout/bottom-nav';

/**
 * The core logic and state management for the Direct Messages page.
 * It handles fetching conversations, selecting a conversation, and sending messages.
 * It also handles deeplinking from other parts of the app via URL search parameters.
 * @returns {JSX.Element} The ChatLayout component with all necessary props.
 */
function DmsPageContent() {
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const recipientName = searchParams.get('recipient');
        const context = searchParams.get('context');

        if (recipientName) {
            const recipient = mockUsers.find(u => u.name === recipientName);
            if (recipient) {
                setConversations(prevConvos => {
                    const existingConvoIndex = prevConvos.findIndex(c => c.participant.id === recipient.id);
                    let newConvos = [...prevConvos];
                    let updatedConvo;

                    if (existingConvoIndex !== -1) {
                        // Conversation exists, update it and move to top
                        updatedConvo = { 
                            ...newConvos[existingConvoIndex], 
                            context: context || newConvos[existingConvoIndex].context 
                        };
                        newConvos.splice(existingConvoIndex, 1); // Remove from old position
                        newConvos.unshift(updatedConvo); // Add to the top
                    } else {
                        // Create a new conversation
                        updatedConvo = {
                            id: `convo-${recipient.id}`,
                            participant: recipient,
                            messages: [],
                            lastMessage: `Regarding: ${context || 'New conversation'}`,
                            lastMessageTime: 'Now',
                            unreadCount: 0,
                            context: context || undefined,
                        };
                        newConvos.unshift(updatedConvo);
                    }
                    
                    setSelectedConversation(updatedConvo);
                    return newConvos;
                });
            }
        } else {
            // If no recipient is specified, ensure no conversation is selected
            // This happens when navigating directly to /dms
            if (!selectedConversation) {
                const firstConvo = conversations.length > 0 ? conversations[0] : null;
                // setSelectedConversation(firstConvo); // We don't want to auto-select
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    /**
     * Handles sending a new message in the selected conversation.
     * @param {string} message - The content of the message to send.
     */
    const handleSendMessage = (message: string) => {
        if (selectedConversation) {
            const newMessage = {
                id: Date.now(),
                sender: mockUsers.find(u => u.id === 'user1')!,
                content: message,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            const updatedConversation = {
                ...selectedConversation,
                messages: [...selectedConversation.messages, newMessage],
                lastMessage: message,
                lastMessageTime: 'Now',
                context: selectedConversation.context, // Preserve context
            };
            
            setSelectedConversation(updatedConversation);

            setConversations(prev => 
                [
                    updatedConversation,
                    ...prev.filter(c => c.id !== selectedConversation.id)
                ]
            );
        }
    };

    /**
     * Handles the selection of a conversation from the list, marking it as read.
     * @param {Conversation | null} conversation - The conversation that was selected.
     */
    const handleSelectConversation = (conversation: Conversation | null) => {
        if (!conversation) {
            setSelectedConversation(null);
            return;
        }

        const fullConvo = conversations.find(c => c.id === conversation.id);

        if (fullConvo) {
            // Mark as read by setting unreadCount to 0
            const updatedConvo: Conversation = {
                ...fullConvo,
                unreadCount: 0,
            };

            // Clear context if it's different from the original selection context
            if (fullConvo.context && conversation.context !== fullConvo.context) {
                updatedConvo.context = undefined;
            }

            // Update the main conversations list
            setConversations(prevConvos => 
                prevConvos.map(c => (c.id === conversation.id ? updatedConvo : c))
            );

            // Set the selected conversation
            setSelectedConversation(updatedConvo);
        } else {
             setSelectedConversation(null);
        }
    };


    return (
       <>
         <ChatLayout 
              conversations={conversations}
              selectedConversation={selectedConversation}
              onConversationSelect={handleSelectConversation}
              onSendMessage={handleSendMessage}
              currentUser={mockUsers.find(u => u.id === 'user1')!}
         />
       </>
    );
}

/**
 * A wrapper component that provides a Suspense boundary for the DmsPageContent.
 * @returns {JSX.Element} The DmsPageContent component wrapped in Suspense.
 */
export default function DmsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DmsPageContent />
        </Suspense>
    )
}
