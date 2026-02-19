
'use client';

import Image from "next/image";
import { FeedItem } from "@/context/feed-context";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Trophy, Users, Play, Verified } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFeed } from "@/context/feed-context";
import Link from "next/link";

interface TournamentPostProps {
    post: FeedItem;
}

const statusStyles = {
    live: 'bg-red-600 text-white',
    upcoming: 'bg-yellow-500 text-black',
    completed: 'bg-gray-500 text-white',
};

export default function TournamentPost({ post }: TournamentPostProps) {
    const { toggleLike, toggleSave } = useFeed();
    
    const isGeneralPost = post.tournament.title === "Just a General Post";

    if (isGeneralPost) {
        return (
             <div className="w-full rounded-lg bg-gaming-surface-secondary border border-gaming-border">
                {/* Post Header */}
                <div className="flex items-center p-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={post.user.avatar} alt={post.user.username} data-ai-hint={post.user.avatarHint} />
                        <AvatarFallback>{post.user.username.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex items-center gap-1">
                        <p className="text-sm font-bold text-gaming-text-primary">{post.user.username}</p>
                        {post.user.verified && <Verified className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />}
                    </div>
                    <p className="text-xs text-gaming-text-secondary ml-2">· Just now</p>
                    <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                        <MoreHorizontal className="h-5 w-5 text-gaming-text-primary" />
                    </Button>
                </div>

                {/* Post Content */}
                <div className="px-3 pb-3 text-sm">
                    <p className="text-gaming-text-primary break-words">{post.caption}</p>
                </div>

                {/* Post Actions */}
                <div className="flex items-center p-2">
                    <Button variant="ghost" size="icon" className="text-gaming-text-primary" onClick={() => toggleLike(post.id)}>
                        <Heart className={cn("h-6 w-6", post.social.liked && "text-red-500 fill-red-500")} />
                    </Button>
                    <Link href={`/post/${post.id}`}>
                        <Button variant="ghost" size="icon" className="text-gaming-text-primary">
                            <MessageCircle className="h-6 w-6" />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="text-gaming-text-primary">
                        <Send className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-auto text-gaming-text-primary" onClick={() => toggleSave(post.id)}>
                        <Bookmark className={cn("h-6 w-6", post.social.bookmarked && "fill-current")} />
                    </Button>
                </div>

                {/* Engagement */}
                 <div className="px-3 pb-3 text-sm">
                    <p className="font-bold text-gaming-text-primary">{post.engagement.likes.toLocaleString()} likes</p>
                    <Link href={`/post/${post.id}`}>
                        <p className="mt-1 text-gaming-text-secondary cursor-pointer">View all {post.engagement.comments} comments</p>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full rounded-lg bg-gaming-surface-secondary border border-gaming-border">
            {/* Post Header */}
            <div className="flex items-center p-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={post.user.avatar} alt={post.user.username} data-ai-hint={post.user.avatarHint} />
                    <AvatarFallback>{post.user.username.substring(0,2)}</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex items-center gap-1">
                    <p className="text-sm font-bold text-gaming-text-primary">{post.user.username}</p>
                    {post.user.verified && <Verified className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />}
                </div>
                <p className="text-xs text-gaming-text-secondary ml-2">· 1h</p>
                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                    <MoreHorizontal className="h-5 w-5 text-gaming-text-primary" />
                </Button>
            </div>

            {/* Post Content */}
            <Link href={`/post/${post.id}`}>
                <div className="relative aspect-square w-full overflow-hidden cursor-pointer">
                    <Image src={post.image!} alt={post.tournament.title} layout="fill" className="object-cover" data-ai-hint={post.imageHint}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge className={cn("text-xs font-bold uppercase", statusStyles[post.tournament.status])}>
                                    {post.tournament.status}
                                </Badge>
                                <h2 className="text-xl font-bold mt-1">{post.tournament.title}</h2>
                                <p className="text-sm font-semibold text-gaming-text-secondary">{post.tournament.game}</p>
                            </div>
                            {post.tournament.status === 'live' && (
                                <Button size="icon" className="bg-white/20 backdrop-blur-sm rounded-full h-12 w-12 animate-pulse-live">
                                    <Play className="h-6 w-6 text-white fill-white"/>
                                </Button>
                            )}
                        </div>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1.5">
                                <Trophy className="h-4 w-4 text-yellow-400"/> ${post.tournament.prize}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users className="h-4 w-4 text-cyan-400"/> {post.tournament.participants}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Post Actions */}
            <div className="flex items-center p-2">
                <Button variant="ghost" size="icon" className="text-gaming-text-primary" onClick={() => toggleLike(post.id)}>
                    <Heart className={cn("h-6 w-6", post.social.liked && "text-red-500 fill-red-500")} />
                </Button>
                 <Link href={`/post/${post.id}`}>
                    <Button variant="ghost" size="icon" className="text-gaming-text-primary">
                        <MessageCircle className="h-6 w-6" />
                    </Button>
                </Link>
                 <Button variant="ghost" size="icon" className="text-gaming-text-primary">
                    <Send className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="ml-auto text-gaming-text-primary" onClick={() => toggleSave(post.id)}>
                    <Bookmark className={cn("h-6 w-6", post.social.bookmarked && "fill-current")} />
                </Button>
            </div>

            {/* Engagement & Caption */}
            <div className="px-3 pb-3 text-sm">
                <p className="font-bold text-gaming-text-primary">{post.engagement.likes.toLocaleString()} likes</p>
                <p className="mt-1 text-gaming-text-primary">
                    <span className="font-bold">{post.user.username}</span>
                    <span className="text-gaming-text-primary"> {post.caption}</span>
                </p>
                 <Link href={`/post/${post.id}`}>
                    <p className="mt-1 text-gaming-text-secondary cursor-pointer">View all {post.engagement.comments} comments</p>
                 </Link>
            </div>
        </div>
    )
}
