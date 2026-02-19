
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
import { Input } from '@/components/ui/input';
import { CheckCircle, AlertOctagon } from 'lucide-react';

const KickRequestSchema = z.object({
    playerToKick: z.string().min(3, "Player's name must be at least 3 characters."),
    reason: z.string().min(10, "Please provide a reason of at least 10 characters.").max(500, "Reason must be 500 characters or less."),
});

interface KickRequestFormProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    tournament: Tournament;
}

export default function KickRequestForm({ isOpen, onOpenChange, tournament }: KickRequestFormProps) {
    const { toast } = useToast();
    const { addKickRequest } = useTournaments();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<z.infer<typeof KickRequestSchema>>({
        resolver: zodResolver(KickRequestSchema),
        defaultValues: {
            playerToKick: "",
            reason: "",
        },
    });

    function onSubmit(data: z.infer<typeof KickRequestSchema>) {
        addKickRequest(tournament.id, {
            ...data,
            requestingPlayer: 'YUV-X', // Mock user
        });
        toast({
            title: "Request Submitted!",
            description: "An admin will review your request shortly.",
        });
        setIsSubmitted(true);
    }
    
    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => {
            form.reset();
            setIsSubmitted(false);
        }, 300);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mx-auto mb-4">
                       <AlertOctagon className="h-6 w-6 text-destructive" />
                    </div>
                    <DialogTitle className="text-center">{isSubmitted ? "Request Sent" : `Request Player Kick-off`}</DialogTitle>
                    <DialogDescription className="text-center">
                         {isSubmitted 
                            ? "Your request has been sent to the tournament admin for review." 
                            : `Tournament: ${tournament.name}`}
                    </DialogDescription>
                </DialogHeader>
                {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-8">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                        <p className="text-muted-foreground">Thank you for helping maintain fair play.</p>
                        <Button onClick={handleClose} className="w-full">Close</Button>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="playerToKick"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Player's In-Game Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the player's name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="reason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reason for Kick Request</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Explain why this player should be removed (e.g., cheating, toxic behavior)." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                                <Button type="submit" variant="destructive">Submit Request</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
