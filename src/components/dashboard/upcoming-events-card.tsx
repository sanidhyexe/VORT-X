
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Mic, Gamepad2, ArrowRight } from "lucide-react";

const events = [
    {
        title: "Pro Coaching Session: Aiming",
        type: "Coaching",
        date: "2024-08-25T18:00",
        icon: Mic,
    },
    {
        title: "Community Game Night",
        type: "Community Event",
        game: "Cosmic Odyssey",
        date: "2024-09-10T19:00",
        icon: Gamepad2,
    },
];


export default function UpcomingEventsCard() {
    return (
        <Card className="shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-lg">Upcoming Events</CardTitle>
                </div>
                <CardDescription>Join community events, workshops, and more.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {events.map((event, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-secondary/30 transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                            <event.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                         <Button variant="ghost" size="icon">
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
               ))}
                <Button variant="outline" className="w-full">View All Events</Button>
            </CardContent>
        </Card>
    )
}
