
'use client';

import Image from "next/image";
import { Story } from "@/context/feed-context";

interface StoriesProps {
    stories: Story[];
}

export default function Stories({ stories }: StoriesProps) {
    return (
        <div className="w-full border-b border-gaming-border bg-gaming-surface py-3">
            <div className="flex space-x-4 overflow-x-auto px-4 stories-scrollbar">
                {stories.map(story => (
                    <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer group">
                        <div className="relative rounded-full p-0.5 bg-gradient-primary">
                             <div className="bg-gaming-surface p-0.5 rounded-full">
                                <Image
                                    src={story.avatar}
                                    alt={story.username}
                                    width={64}
                                    height={64}
                                    className="rounded-full"
                                    data-ai-hint={story.avatarHint}
                                />
                             </div>
                              {story.live && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-sm bg-destructive px-1.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white animate-pulse-live">
                                    Live
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gaming-text-primary truncate w-16 text-center">{story.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
