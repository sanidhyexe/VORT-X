
'use client';

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { useTournaments, Tournament } from "@/context/tournament-context";
import { useState } from "react";
import { Banknote, CheckCircle, CreditCard, Loader2, Trash2, UserPlus, Users } from "lucide-react";

const FormSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters."),
  contactEmail: z.string().email("Please enter a valid email."),
  members: z.array(z.object({ name: z.string().min(3, "Player name must be at least 3 characters.") })).optional(),
});


interface TournamentRegistrationFormProps {
    tournament: Tournament;
    onFormSubmit: () => void;
}

export default function TournamentRegistrationForm({ tournament, onFormSubmit }: TournamentRegistrationFormProps) {
    const { toast } = useToast();
    const { registerForTournament } = useTournaments();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<z.infer<typeof FormSchema> | null>(null);
    const [isPaying, setIsPaying] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            teamName: "",
            contactEmail: "",
            // Automatically add the current user as the first team member if roster is required
            members: tournament.requireFullTeam ? [{ name: "YUV-X" }] : [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "members"
    });

    function onDetailsSubmit(data: z.infer<typeof FormSchema>) {
        if (tournament.requireFullTeam && (!data.members || data.members.length === 0)) {
            form.setError("members", { type: "manual", message: "At least one team member is required."});
            return;
        }
        setFormData(data);
        setStep(2); // Move to payment step
    }

    function handlePayment() {
        if (!formData) return;
        
        setIsPaying(true);

        // Mock payment processing
        setTimeout(() => {
            registerForTournament(tournament.id, formData);
            
            setIsPaying(false);
            setStep(3); // Move to confirmation step

        }, 1500);
    }
    
    return (
        <>
            <DialogHeader>
                <DialogTitle>Register for: {tournament.name}</DialogTitle>
                <DialogDescription>
                    {step === 1 && "Fill out your team's details to join. Good luck!"}
                    {step === 2 && "Complete payment to secure your spot."}
                    {step === 3 && "You are all set! Welcome to the tournament."}
                </DialogDescription>
            </DialogHeader>

            {step === 1 && (
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onDetailsSubmit)} className="space-y-4">
                        <ScrollArea className="h-96 w-full pr-4">
                            <div className="space-y-6 py-4">
                                <FormField
                                    control={form.control}
                                    name="teamName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Team Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="The Champions" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="contactEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Team Contact Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="contact@team.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                {tournament.requireFullTeam && (
                                    <>
                                        <Separator className="my-6" />

                                        <div className="space-y-4">
                                            <FormLabel className="flex items-center gap-2"><Users className="h-4 w-4" />Team Roster</FormLabel>
                                            {fields.map((field, index) => (
                                                <FormField
                                                    key={field.id}
                                                    control={form.control}
                                                    name={`members.${index}.name`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <div className="flex items-center gap-2">
                                                                <FormControl>
                                                                    <Input 
                                                                        placeholder={`Player ${index + 1} In-Game Name`} 
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                {/* Allow removing members, but not the first one (the user themself) */}
                                                                {index > 0 && (
                                                                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                                                        <Trash2 className="h-4 w-4 text-destructive"/>
                                                                    </Button>
                                                                )}
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                             <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "" })}>
                                                <UserPlus className="mr-2" /> Add Team Member
                                            </Button>
                                            <FormField
                                                control={form.control}
                                                name="members"
                                                render={() => <FormMessage />}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </ScrollArea>
                        <DialogFooter>
                            <Button type="submit">Proceed to Payment</Button>
                        </DialogFooter>
                    </form>
                </Form>
            )}

            {step === 2 && (
                <div className="py-6">
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <Banknote className="h-16 w-16 text-primary" />
                        <h3 className="text-2xl font-bold">Entry Fee: $10.00</h3>
                        <p className="text-muted-foreground">
                            A small entry fee is required to join. This contributes to the prize pool.
                        </p>
                        <Button 
                            size="lg" 
                            className="w-full"
                            onClick={handlePayment}
                            disabled={isPaying}
                        >
                            {isPaying ? (
                                <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                 Processing...
                                </>
                            ) : (
                                <>
                                 <CreditCard className="mr-2 h-4 w-4"/>
                                 Pay with Card
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="py-6">
                     <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                        <h3 className="text-2xl font-bold">Registration Successful!</h3>
                        <p className="text-muted-foreground">
                            Your spot is confirmed. We've sent a confirmation to <span className="font-semibold text-primary">{formData?.contactEmail}</span>.
                        </p>
                        <Button className="w-full" onClick={onFormSubmit}>
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
