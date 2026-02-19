
// This file contains the old type definition for a FeedItem.
// It's preserved to avoid breaking other components that still rely on it.
// The new, preferred type is defined in `feed-context.tsx`.

export interface FeedItem {
    id: number;
    author: string;
    avatar: string;
    avatarHint: string;
    time: string;
    content: string;
    image?: string;
    imageHint?: string;
    likes: number;
    commentsCount: number;
    liked?: boolean;
    saved?: boolean;
}
