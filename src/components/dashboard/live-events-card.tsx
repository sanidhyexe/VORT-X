
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Users, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

const liveEvents = [
    {
        id: 1,
        game: "Valorant",
        eventName: "VCT Champions 2025: Grand Final - Sentinels vs Fnatic",
        team1: { name: "Sentinels", logo: "https://placehold.co/40x40.png", logoHint: "sentinels logo" },
        team2: { name: "Fnatic", logo: "https://placehold.co/40x40.png", logoHint: "fnatic logo" },
        viewers: "1.2M",
        streamLink: "https://www.twitch.tv/",
    },
     {
        id: 2,
        game: "League of Legends",
        eventName: "Worlds 2025: Semifinals - T1 vs G2 Esports",
        team1: { name: "T1", logo: "https://placehold.co/40x40.png", logoHint: "t1 logo" },
        team2: { name: "G2 Esports", logo: "https://placehold.co/40x40.png", logoHint: "g2 esports logo" },
        viewers: "2.8M",
        streamLink: "https://www.twitch.tv/",
    },
];

export default function LiveEventsCard() {
    return (
        <Card className="shadow-lg transition-all duration-300 hover:shadow-primary/20 bg-gradient-to-r from-card to-secondary/30">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Radio className="h-6 w-6 text-primary" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-primary rounded-full animate-ping" />
                        </div>
                        <CardTitle className="font-headline text-lg">
                            Live Now
                        </CardTitle>
                    </div>
                    <Button variant="link" asChild>
                        <Link href="/events">View All</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {liveEvents.map((event) => (
                        <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg border bg-secondary/30 hover:border-primary/50 transition-colors">
                           <div className="flex items-center gap-2">
                                <Image src={event.team1.logo} alt={event.team1.name} width={24} height={24} className="rounded-full" data-ai-hint={event.team1.logoHint}/>
                                <span className="font-bold text-sm">vs</span>
                                <Image src={event.team2.logo} alt={event.team2.name} width={24} height={24} className="rounded-full" data-ai-hint={event.team2.logoHint}/>
                           </div>
                           <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold break-words line-clamp-3">{event.eventName}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Eye className="h-3 w-3 text-destructive"/>
                                    {event.viewers}
                                </div>
                           </div>
                            <Button size="sm" asChild>
                                <a href={event.streamLink} target="_blank" rel="noopener noreferrer">Watch</a>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
