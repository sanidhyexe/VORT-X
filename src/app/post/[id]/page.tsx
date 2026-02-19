
'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useFeed } from '@/context/feed-context';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, FileImage, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import ActivityFeed, {Comment} from '@/components/dashboard/activity-feed';

export default function PostPage() {
    const params = useParams();
    const postId = params.id as string;
    // @ts-ignore - Using legacy `getPost` which returns the old FeedItem type
    const { getPost, addComment } = useFeed();
    const { toast } = useToast();

    const post = getPost(parseInt(postId));
    
    const [commentText, setCommentText] = useState('');

    if (!post) {
        notFound();
    }

    // @ts-ignore
    const comments: Comment[] = post.comments || [];
    
    const sortedComments = [...comments];
    sortedComments.sort((a, b) => b.id - a.id);

    const handleCommentSubmit = () => {
        if(commentText.trim()){
            const newComment: Comment = {
                id: Date.now(),
                author: 'YUV-X',
                avatar: 'https://placehold.co/40x40.png',
                content: commentText.trim(),
                time: 'Just now'
            };
            addComment(post.id, newComment);
            setCommentText('');
            toast({
                title: "Comment posted!",
            });
        } else {
             toast({
                title: "Cannot post an empty comment.",
                variant: "destructive",
            });
        }
    }

    const legacyPost = {
        id: post.id,
        // @ts-ignore
        author: post.user.username,
        // @ts-ignore
        avatar: post.user.avatar,
        avatarHint: '',
        time: '1h ago',
        // @ts-ignore
        content: post.caption,
        image: post.image,
        imageHint: post.imageHint,
        // @ts-ignore
        likes: post.engagement.likes,
        // @ts-ignore
        commentsCount: post.engagement.comments,
        // @ts-ignore
        liked: post.social.liked,
        // @ts-ignore
        saved: post.social.bookmarked,
        comments: sortedComments
    }


    return (
        <div className="container p-4 sm:p-6">
            <div className="mx-auto max-w-2xl">
                 <Button asChild variant="ghost" className="mb-4 -ml-4">
                   <Link href="/social">
                     <ChevronLeft className="mr-2 h-4 w-4" />
                     Back to Feed
                   </Link>
                 </Button>
                
                <ActivityFeed feedItems={[legacyPost]} />

                <Separator className="my-6" />

                <h2 className="text-xl font-bold mb-4">Comments ({comments?.length || 0})</h2>
                
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <div className="flex gap-4">
                            <Avatar>
                                <AvatarImage src={'https://placehold.co/128x128.png'} alt="User Avatar" data-ai-hint="gamer avatar"/>
                                <AvatarFallback>{'U'}</AvatarFallback>
                            </Avatar>
                            <div className='w-full space-y-2'>
                                <Textarea 
                                    placeholder="Write a comment..." 
                                    className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                                <div className='flex justify-between items-center'>
                                    <Button variant="ghost" size="icon">
                                        <FileImage className='h-5 w-5 text-muted-foreground' />
                                    </Button>
                                    <Button onClick={handleCommentSubmit}>
                                        Post Comment <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <div className="space-y-4">
                   {sortedComments.map(comment => (
                        <div key={comment.id} className="flex gap-4">
                            <Avatar>
                                <AvatarImage src={comment.avatar} alt={comment.author} data-ai-hint="commenter avatar" />
                                <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="bg-secondary/50 rounded-lg px-4 py-3">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-sm">{comment.author}</p>
                                        <p className="text-xs text-muted-foreground">{comment.time}</p>
                                    </div>
                                    <p className="text-sm mt-1 break-words">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                   ))}
                </div>
            </div>
        </div>
    );
}
