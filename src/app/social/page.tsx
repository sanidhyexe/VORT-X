
'use client';

import { useState } from 'react';
import { useFeed } from "@/context/feed-context";
import Stories from "@/components/social/stories";
import TournamentPost from "@/components/social/tournament-post";
import CreatePostDialog from "@/components/dashboard/create-post-dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

export default function SocialPage() {
  const { feedItems, stories, addPost } = useFeed();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddPost = (content: string) => {
    addPost(content);
    setIsDialogOpen(false);
    toast({
      title: "Post Created!",
      description: "Your post has been successfully published.",
    });
  };

  return (
    <div className="bg-background min-h-screen">
        <main className="pb-16">
            <div className="max-w-md mx-auto">
                <Stories stories={stories} />
                <div className="py-4 space-y-4 px-2 sm:px-0">
                    {feedItems.map(post => (
                        <TournamentPost key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </main>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg" size="icon">
                    <Plus className="h-6 w-6" />
                    <span className="sr-only">Create Post</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0">
                <CreatePostDialog onAddPost={handleAddPost} />
            </DialogContent>
        </Dialog>
    </div>
  );
}
