
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTournaments, Tournament } from '@/context/tournament-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const FeedbackSchema = z.object({
    rating: z.number().min(1, "Please select a rating.").max(5),
    comment: z.string().max(500, "Comment must be 500 characters or less.").optional(),
});

interface TournamentFeedbackFormProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    tournament: Tournament;
}

export default function TournamentFeedbackForm({ isOpen, onOpenChange, tournament }: TournamentFeedbackFormProps) {
    const { toast } = useToast();
    const { addFeedback } = useTournaments();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<z.infer<typeof FeedbackSchema>>({
        resolver: zodResolver(FeedbackSchema),
        defaultValues: {
            rating: 0,
            comment: "",
        },
    });

    function onSubmit(data: z.infer<typeof FeedbackSchema>) {
        addFeedback(tournament.id, {
            ...data,
            participantName: 'YUV-X', // Mock user
        });
        toast({
            title: "Feedback Submitted!",
            description: "Thank you for helping us improve.",
        });
        setIsSubmitted(true);
    }
    
    const handleClose = () => {
        onOpenChange(false);
        // Reset form after a delay to allow dialog to close smoothly
        setTimeout(() => {
            form.reset();
            setIsSubmitted(false);
        }, 300);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isSubmitted ? "Thank You!" : `Feedback for ${tournament.name}`}</DialogTitle>
                    <DialogDescription>
                         {isSubmitted 
                            ? "Your feedback has been recorded." 
                            : "Let us know how we did. Your feedback helps us improve future events."}
                    </DialogDescription>
                </DialogHeader>
                {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-8">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                        <p className="text-muted-foreground">We appreciate you taking the time.</p>
                        <Button onClick={handleClose} className="w-full">Close</Button>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Overall Rating</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        type="button"
                                                        key={star}
                                                        onClick={() => field.onChange(star)}
                                                        className="focus:outline-none"
                                                    >
                                                        <Star
                                                            className={cn(
                                                                "h-8 w-8 transition-colors",
                                                                star <= (field.value || 0)
                                                                    ? "text-yellow-400 fill-yellow-400"
                                                                    : "text-muted-foreground hover:text-yellow-300"
                                                            )}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Additional Comments (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Tell us more about your experience..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Submit Feedback</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
