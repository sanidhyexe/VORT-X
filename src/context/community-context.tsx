
'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

/**
 * @interface Message
 * @description Represents a message in a community channel.
 * @property {number} id - Unique identifier for the message.
 * @property {string} author - The name of the message author.
 * @property {string} avatar - URL for the author's avatar.
 * @property {string} avatarHint - AI hint for the avatar.
 * @property {string} content - The message content.
 * @property {boolean} isCurrentUser - True if the message was sent by the logged-in user.
 */
export interface Message {
    id: number;
    author: string;
    avatar: string;
    avatarHint: string;
    content: string;
    isCurrentUser: boolean;
}

/**
 * @interface Community
 * @description Represents a community or group on the platform.
 * @property {number} id - Unique identifier for the community.
 * @property {string} name - The name of the community.
 * @property {string} [description] - A brief description of the community.
 * @property {string} members - A formatted string representing the number of members (e.g., "125K").
 * @property {string} image - URL for the community's banner image.
 * @property {string} imageHint - A hint for AI image generation for the banner.
 * @property {'permanent' | 'tournament'} type - The type of community. 'permanent' are user-created hubs, 'tournament' are temporary channels for events.
 * @property {{ [channelName: string]: Message[] }} [channels] - A record of channels and their messages.
 */
export interface Community {
    id: number;
    name: string;
    description?: string;
    members: string;
    image: string;
    imageHint: string;
    type: 'permanent' | 'tournament';
    channels?: {
        [channelName: string]: Message[];
    }
}

const initialCommunities: Community[] = [
    { id: 1, name: "Apex Legends", description: "For fans of the battle royale.", members: "125K", image: "https://placehold.co/300x150.png", imageHint: "apex legends characters", type: 'permanent' },
    { id: 2, name: "Valorant", description: "Tactical shooter community.", members: "88K", image: "https://placehold.co/300x150.png", imageHint: "valorant game art", type: 'permanent' },
    { id: 3, name: "League of Legends", description: "Discuss the latest meta.", members: "210K", image: "https://placehold.co/300x150.png", imageHint: "league of legends champions", type: 'permanent' },
    { id: 4, name: "Counter-Strike 2", description: "The premier tactical shooter hub.", members: "150K", image: "https://placehold.co/300x150.png", imageHint: "counter strike soldier", type: 'permanent' },
    { id: 5, name: "Fortnite", description: "Build, battle, and create.", members: "300K", image: "https://placehold.co/300x150.png", imageHint: "fortnite characters", type: 'permanent' },
];

/**
 * @interface CommunityContextType
 * @description The shape of the context provided by CommunityProvider.
 */
interface CommunityContextType {
    communities: Community[];
    addCommunity: (community: Omit<Community, 'id' | 'members'>) => void;
    getMessages: (communityName: string, channelName: string) => Message[];
    addMessage: (communityName: string, channelName: string, message: Omit<Message, 'id'>) => void;
    postBotMessage: (communityName: string, content: string) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

/**
 * Provides community-related state and actions to its children.
 * This includes the list of communities and a function to create new ones.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components that will consume the context.
 * @returns {JSX.Element} The provider component.
 */
export const CommunityProvider = ({ children }: { children: ReactNode }) => {
    const [communities, setCommunities] = useState<Community[]>(initialCommunities);

    /**
     * Adds a new community to the state.
     * @param {Omit<Community, 'id' | 'members'>} community - The community data to add, without id and member count.
     */
    const addCommunity = useCallback((community: Omit<Community, 'id' | 'members'>) => {
        const newCommunity: Community = {
            ...community,
            id: Date.now(),
            members: "1", // Starts with the creator
        };
        
        // Add new communities to the top of the list
        setCommunities(prev => {
            // Prevent adding duplicate communities by name
            if (prev.some(c => c.name === newCommunity.name)) {
                return prev;
            }
            return [newCommunity, ...prev]
        });
    }, []);

    /**
     * Retrieves messages for a specific channel in a community.
     * @param {string} communityName - The name of the community.
     * @param {string} channelName - The name of the channel.
     * @returns {Message[]} An array of messages for the specified channel.
     */
    const getMessages = (communityName: string, channelName: string): Message[] => {
        const community = communities.find(c => c.name === communityName);
        if (community && community.channels && community.channels[channelName]) {
            return community.channels[channelName];
        }
        return [];
    }

    /**
     * Adds a new message to a channel in a community.
     * @param {string} communityName - The name of the community.
     * @param {string} channelName - The name of the channel.
     * @param {Omit<Message, 'id'>} message - The message object to add.
     */
    const addMessage = (communityName: string, channelName: string, message: Omit<Message, 'id'>) => {
        setCommunities(prev => prev.map(c => {
            if (c.name === communityName) {
                const newMessage: Message = { ...message, id: Date.now() };
                const channels = c.channels || {};
                const channelMessages = channels[channelName] || [];
                channels[channelName] = [...channelMessages, newMessage];
                return { ...c, channels };
            }
            return c;
        }))
    }

    /**
     * Posts a message from the "VORT-X Bot" to a channel.
     * @param {string} communityName - The name of the community.
     * @param {string} content - The content of the bot's message.
     */
    const postBotMessage = (communityName: string, content: string) => {
        const botMessage: Omit<Message, 'id'> = {
            author: 'VORT-X Bot',
            avatar: 'https://placehold.co/40x40.png',
            avatarHint: 'bot avatar',
            content: content,
            isCurrentUser: false,
        };
        addMessage(communityName, 'general-chat', botMessage);
    }

    return (
        <CommunityContext.Provider value={{ communities, addCommunity, getMessages, addMessage, postBotMessage }}>
            {children}
        </CommunityContext.Provider>
    );
};

/**
 * A custom hook to easily access the CommunityContext.
 * @throws {Error} If used outside of a CommunityProvider.
 * @returns {CommunityContextType} The community context.
 */
export const useCommunities = () => {
    const context = useContext(CommunityContext);
    if (context === undefined) {
        throw new Error('useCommunities must be used within a CommunityProvider');
    }
    return context;
};
