
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Eye, Radio } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const allLiveEvents = [
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
    {
        id: 3,
        game: "Counter-Strike 2",
        eventName: "IEM Katowice 2025 - Quarterfinals",
        team1: { name: "Natus Vincere", logo: "https://placehold.co/40x40.png", logoHint: "navi logo" },
        team2: { name: "FaZe Clan", logo: "https://placehold.co/40x40.png", logoHint: "faze clan logo" },
        viewers: "850K",
        streamLink: "https://www.twitch.tv/",
    },
     {
        id: 4,
        game: "Dota 2",
        eventName: "The International 2025 - Group Stage",
        team1: { name: "Team Spirit", logo: "https://placehold.co/40x40.png", logoHint: "team spirit logo" },
        team2: { name: "Gaimin Gladiators", logo: "https://placehold.co/40x40.png", logoHint: "gaimin gladiators logo" },
        viewers: "670K",
        streamLink: "https://www.twitch.tv/",
    },
];


export default function EventsPage() {
    return (
        <div className="container p-4 sm:p-6">
            <div className="mx-auto max-w-4xl space-y-6">
                <div>
                    <Button asChild variant="ghost" className="mb-4 -ml-4">
                        <Link href="/">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </Button>
                    <div className="flex items-center gap-3">
                        <Radio className="h-6 w-6 text-primary" />
                        <h1 className="text-2xl font-bold">Live Events</h1>
                    </div>
                    <p className="text-muted-foreground">Watch top-tier esports matches happening right now.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allLiveEvents.map((event) => (
                        <Card key={event.id} className="transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex items-center gap-2 mt-1">
                                        <Image src={event.team1.logo} alt={event.team1.name} width={32} height={32} className="rounded-full" data-ai-hint={event.team1.logoHint}/>
                                        <span className="font-bold text-sm">vs</span>
                                        <Image src={event.team2.logo} alt={event.team2.name} width={32} height={32} className="rounded-full" data-ai-hint={event.team2.logoHint}/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold break-words">{event.eventName}</p>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                            <span>{event.game}</span>
                                            <div className="flex items-center gap-1.5">
                                                <Eye className="h-3 w-3 text-destructive"/>
                                                {event.viewers}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button size="sm" asChild className="w-full mt-4">
                                    <a href={event.streamLink} target="_blank" rel="noopener noreferrer">Watch Now</a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
