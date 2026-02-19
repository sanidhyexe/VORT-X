
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Video, Mic, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Card, CardContent, CardHeader } from '../ui/card';
import { DialogHeader, DialogTitle } from '../ui/dialog';

interface CreatePostDialogProps {
    onAddPost: (content: string) => void;
}

export default function CreatePostDialog({ onAddPost }: CreatePostDialogProps) {
    const [content, setContent] = useState("");

    const handlePost = () => {
        if (content.trim() === "") return;
        onAddPost(content);
        setContent("");
    }

    return (
        <div className='flex flex-col'>
            <DialogHeader className='p-4 border-b'>
                <DialogTitle>Create Post</DialogTitle>
            </DialogHeader>
            <div className="p-4">
                <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src={"https://placehold.co/40x40.png"} alt={"User"} data-ai-hint="gamer avatar"/>
                        <AvatarFallback>{'U'}</AvatarFallback>
                    </Avatar>
                    <div className="w-full space-y-2">
                        <Textarea 
                            placeholder={`What's on your mind, gamer?`} 
                            className="min-h-[100px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 bg-transparent"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>
            </div>
             <div className="flex justify-between items-center p-4 border-t bg-muted/50">
                <TooltipProvider>
                    <div className="flex gap-0.5">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"><ImageIcon className="h-5 w-5 text-muted-foreground"/></Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Add Image</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"><Video className="h-5 w-5 text-muted-foreground"/></Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Add Video</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"><Mic className="h-5 w-5 text-muted-foreground"/></Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Record Audio</p></TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
                <Button onClick={handlePost} disabled={!content.trim()}>
                    Post <Send className="ml-2 h-4 w-4"/>
                </Button>
            </div>
        </div>
    )
}
