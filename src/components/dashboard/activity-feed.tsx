
'use client';

import { useState, useEffect, useRef } from "react";
import { useFeed } from "@/context/feed-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ThumbsUp, MessageCircle, MoreHorizontal, Bookmark } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "../ui/separator";
import type {FeedItem as OldFeedItemType} from '@/context/old-feed-context-type';

export interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    time: string;
}

// This is the old type definition, keeping it for compatibility with other pages
// The new type is in feed-context.tsx
export interface FeedItem extends OldFeedItemType {
    comments?: Comment[];
}

interface ActivityFeedProps {
    limit?: number;
    viewMode?: 'list' | 'grid';
    feedItems: FeedItem[];
}

export default function ActivityFeed({ limit, viewMode = 'list', feedItems }: ActivityFeedProps) {
  const { toggleLike, toggleSave } = useFeed();
  const itemsToDisplay = limit ? feedItems.slice(0, limit) : feedItems;
  
   const LikeCounter = ({ count }: { count: number }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const prevCountRef = useRef(count);

    useEffect(() => {
        if (prevCountRef.current !== count) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 300);
            prevCountRef.current = count;
            return () => clearTimeout(timer);
        }
    }, [count]);

    return <span className={cn("text-sm", isAnimating && "animate-pop")}>{count.toLocaleString()}</span>;
  };

  const handleInteraction = (action: 'like' | 'save', itemId: number) => {
    if (action === 'like') {
        // This is a temporary fix as the new context uses a different data structure
        // This component is now considered legacy and will be phased out
        // @ts-ignore
        toggleLike(itemId);
    } else {
        // @ts-ignore
        toggleSave(itemId);
    }
  }


  if (viewMode === 'grid') {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {itemsToDisplay.map((item) => (
                 <Link key={item.id} href={`/post/${item.id}`} passHref>
                    <Card className="overflow-hidden group relative aspect-square transition-transform duration-200 hover:scale-105">
                        {item.image ? (
                            <Image src={item.image} alt="Feed item image" fill className="object-cover w-full h-full" data-ai-hint={item.imageHint}/>
                        ) : (
                            <div className="bg-secondary h-full w-full flex items-center justify-center p-4">
                                <p className="text-xs text-muted-foreground text-center line-clamp-4">{item.content}</p>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col justify-end p-2 text-white">
                            <p className="text-xs line-clamp-2">{item.content}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs">
                                <div className="flex items-center gap-1">
                                    <ThumbsUp className="h-3 w-3" /> {item.likes}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle className="h-3 w-3" /> {item.commentsCount}
                                </div>
                            </div>
                        </div>
                    </Card>
                 </Link>
            ))}
        </div>
    )
  }

  return (
    <div className="space-y-6">
        {itemsToDisplay.map((item) => (
            <Card key={item.id} className="overflow-hidden border border-border/50 shadow-md shadow-black/20">
                <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <Avatar>
                              <AvatarImage src={item.avatar} alt={item.author} data-ai-hint={item.avatarHint}/>
                              <AvatarFallback>{item.author.substring(0,2)}</AvatarFallback>
                          </Avatar>
                          <div>
                              <p className="font-semibold">{item.author}</p>
                              <p className="text-xs text-muted-foreground">{item.time}</p>
                          </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <MoreHorizontal className="h-5 w-5"/>
                      </Button>
                    </div>
                </CardHeader>
                <CardContent className="px-4 pb-3">
                    <p className="mb-4 text-sm leading-relaxed break-words">{item.content}</p>
                    {item.image && (
                         <Link href={`/post/${item.id}`}>
                            <div className="rounded-lg overflow-hidden border border-border/50 cursor-pointer transition-transform duration-200 hover:scale-[1.01]">
                                <Image src={item.image} alt="Feed item image" width={600} height={400} className="object-cover w-full h-auto" data-ai-hint={item.imageHint}/>
                            </div>
                        </Link>
                    )}
                </CardContent>
                <div className="px-4 pb-2">
                    <div className="flex justify-between text-muted-foreground text-xs py-2">
                        <div className="flex items-center gap-1">
                             <ThumbsUp className="h-4 w-4 text-primary"/>
                            <LikeCounter count={item.likes} />
                        </div>
                        <span>{item.commentsCount.toLocaleString()} comments</span>
                    </div>
                </div>
                <Separator className="bg-border/50"/>
                <CardFooter className="p-0">
                    <div className="flex justify-between w-full">
                       <Button 
                            variant="ghost" 
                            className={cn(
                                "text-muted-foreground hover:text-primary rounded-none flex-1 py-4",
                                item.liked && "text-primary bg-primary/10"
                            )}
                            onClick={() => handleInteraction('like', item.id)}
                        >
                            <ThumbsUp className={cn("mr-2 h-5 w-5", item.liked && "fill-current")}/> Like
                        </Button>
                        <Link href={`/post/${item.id}`} className="flex-1">
                            <Button variant="ghost" className="text-muted-foreground hover:text-primary rounded-none w-full py-4">
                                <MessageCircle className="mr-2 h-5 w-5"/> Comment
                            </Button>
                        </Link>
                        <Button 
                            variant="ghost" 
                            className={cn(
                                "text-muted-foreground hover:text-primary rounded-none flex-1 py-4",
                                item.saved && "text-primary bg-primary/10"
                            )}
                            onClick={() => handleInteraction('save', item.id)}
                        >
                            <Bookmark className={cn("mr-2 h-5 w-5", item.saved && "fill-current")}/> Save
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        ))}
    </div>
  );
}
