
'use client';

import { useState } from 'react';
import ActivityFeed from "@/components/dashboard/activity-feed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, List, Grid } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useFeed } from '@/context/feed-context';

export default function AllPostsPage() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { feedItems } = useFeed();
  const userPosts = feedItems.filter(item => item.author === 'YUV-X' || item.author === 'YUV-X');

  return (
      <div className="container p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-4">
           <div className="flex justify-between items-center">
                <Button asChild variant="ghost" className="-ml-4">
                    <Link href="/">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                    </Link>
                </Button>

                <ToggleGroup 
                    type="single" 
                    value={viewMode}
                    onValueChange={(value) => {
                        if (value) setViewMode(value as 'list' | 'grid');
                    }}
                    aria-label="View mode"
                >
                    <ToggleGroupItem value="list" aria-label="List view">
                        <List className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                        <Grid className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
           </div>
           
           <div className="space-y-4">
            <h1 className="font-headline text-2xl">All Posts</h1>
            <ActivityFeed feedItems={userPosts} viewMode={viewMode} />
           </div>
        </div>
      </div>
  );
}
