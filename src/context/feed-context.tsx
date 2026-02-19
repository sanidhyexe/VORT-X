
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    time: string;
}

export interface Story {
    id: number;
    username: string;
    avatar: string;
    avatarHint: string;
    live?: boolean;
}

export interface FeedItem {
    id: number;
    user: {
        username: string;
        verified: boolean;
        avatar: string;
        avatarHint: string;
    };
    tournament: {
        title: string;
        game: string;
        prize: string;
        participants: string;
        status: 'live' | 'upcoming' | 'completed';
    };
    image?: string;
    imageHint?: string;
    caption: string;
    engagement: {
        likes: number;
        comments: number;
        shares: number;
    };
    social: {
        liked: boolean;
        bookmarked: boolean;
    };
    comments?: Comment[];
}

const initialStories: Story[] = [
    { id: 1, username: "Your Story", avatar: "https://placehold.co/128x128.png", avatarHint: "your avatar" },
    { id: 2, username: "ESL_CSGO", avatar: "https://placehold.co/128x128.png", avatarHint: "esl logo", live: true },
    { id: 3, username: "RiotGames", avatar: "https://placehold.co/128x128.png", avatarHint: "riot games logo" },
    { id: 4, username: "TheScoreEsports", avatar: "https://placehold.co/128x128.png", avatarHint: "thescore logo" },
    { id: 5, username: "FaZeClan", avatar: "https://placehold.co/128x128.png", avatarHint: "faze clan logo", live: true },
    { id: 6, username: "Sentinels", avatar: "https://placehold.co/128x128.png", avatarHint: "sentinels logo" },
    { id: 7, username: "T1", avatar: "https://placehold.co/128x128.png", avatarHint: "t1 logo" },
    { id: 8, username: "G2Esports", avatar: "https://placehold.co/128x128.png", avatarHint: "g2 esports logo" },
];

const initialFeedItems: FeedItem[] = [
    {
        id: 1,
        user: { username: "VCT", verified: true, avatar: "https://placehold.co/128x128.png", avatarHint: "vct logo" },
        tournament: {
            title: "Champions Grand Final",
            game: "Valorant",
            prize: "1M",
            participants: "16 Teams",
            status: 'live',
        },
        image: "https://placehold.co/600x600.png",
        imageHint: "valorant championship stage",
        caption: "The grand final is LIVE! Who will take home the trophy? #VCT #Valorant #Esports",
        engagement: { likes: 124000, comments: 3056, shares: 987 },
        social: { liked: false, bookmarked: true },
        comments: []
    },
    {
        id: 2,
        user: { username: "ESL_CSGO", verified: true, avatar: "https://placehold.co/128x128.png", avatarHint: "esl logo" },
        tournament: {
            title: "IEM Katowice Playoffs",
            game: "Counter-Strike 2",
            prize: "500K",
            participants: "8 Teams",
            status: 'upcoming',
        },
        image: "https://placehold.co/600x600.png",
        imageHint: "counter strike tournament",
        caption: "The playoffs are set! Which team has what it takes to lift the trophy in Katowice? #CS2 #IEM #Esports",
        engagement: { likes: 88000, comments: 1023, shares: 450 },
        social: { liked: true, bookmarked: false },
        comments: []
    },
];


interface FeedContextType {
    feedItems: FeedItem[];
    stories: Story[];
    getPost: (id: number) => FeedItem | undefined;
    toggleLike: (id: number) => void;
    toggleSave: (id: number) => void;
    addComment: (postId: number, comment: Comment) => void;
    addPost: (content: string) => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider = ({ children }: { children: ReactNode }) => {
    const [feedItems, setFeedItems] = useState<FeedItem[]>(initialFeedItems);
    const [stories, setStories] = useState<Story[]>(initialStories);

    const getPost = (id: number) => {
        return feedItems.find(item => item.id === id);
    };

    const toggleLike = (id: number) => {
        setFeedItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    const newLikedState = !item.social.liked;
                    const newLikesCount = newLikedState ? item.engagement.likes + 1 : item.engagement.likes - 1;
                    return { 
                        ...item, 
                        social: { ...item.social, liked: newLikedState },
                        engagement: { ...item.engagement, likes: newLikesCount }
                    };
                }
                return item;
            })
        );
    };

    const toggleSave = (id: number) => {
        setFeedItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, social: { ...item.social, bookmarked: !item.social.bookmarked } };
                }
                return item;
            })
        );
    };

    const addComment = (postId: number, comment: Comment) => {
        setFeedItems(prevItems =>
            prevItems.map(item => {
                if (item.id === postId) {
                    const newComments = [comment, ...(item.comments || [])];
                    return { 
                        ...item, 
                        comments: newComments, 
                        engagement: { ...item.engagement, comments: item.engagement.comments + 1 } 
                    };
                }
                return item;
            })
        );
    };
    
    const addPost = (content: string) => {
        const newPost: FeedItem = {
            id: Date.now(),
            user: { 
                username: "YUV-X", 
                verified: true, 
                avatar: "https://placehold.co/128x128.png",
                avatarHint: "esports player avatar" 
            },
            // This is a simplified post, so we'll mock the tournament data
            // In a real app, you might have different post types
            tournament: {
                title: "Just a General Post",
                game: "Discussion",
                prize: "0",
                participants: "0",
                status: 'completed',
            },
            caption: content,
            engagement: { likes: 0, comments: 0, shares: 0 },
            social: { liked: false, bookmarked: false },
            comments: []
        };

        setFeedItems(prevItems => [newPost, ...prevItems]);
    };

    return (
        <FeedContext.Provider value={{ feedItems, stories, getPost, toggleLike, toggleSave, addComment, addPost }}>
            {children}
        </FeedContext.Provider>
    );
};

export const useFeed = () => {
    const context = useContext(FeedContext);
    if (context === undefined) {
        throw new Error('useFeed must be used within a FeedProvider');
    }
    return context;
};
