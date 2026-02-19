
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, ArrowRight, Gamepad2 } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useCommunities } from "@/context/community-context";

export default function CommunityHubs() {
    const { communities } = useCommunities();

    const permanentCommunities = communities.filter(c => c.type === 'permanent');
    const tournamentCommunities = communities.filter(c => c.type === 'tournament');

    return (
        <Card className="shadow-lg transition-all duration-300 hover:shadow-primary/20">
            <CardHeader>
                <CardTitle className="font-headline text-lg">Community Hubs</CardTitle>
                <CardDescription>Join the conversation in your favorite game communities.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                     {tournamentCommunities.length > 0 && (
                        <div>
                             <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-1">Tournament Channels</h3>
                             <div className="space-y-2">
                                {tournamentCommunities.map((hub) => (
                                    <Link key={hub.id} href={`/communities/${encodeURIComponent(hub.name)}`} passHref>
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 cursor-pointer transition-colors border">
                                           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary flex-shrink-0">
                                                <Gamepad2 className="h-5 w-5 text-primary" />
                                           </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm break-words">{hub.name}</p>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <Users className="h-3 w-3 mr-1" />
                                                    {hub.members} Members
                                                </div>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {permanentCommunities.map((hub) => (
                         <Link key={hub.id} href={`/communities/${encodeURIComponent(hub.name)}`} passHref>
                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/10 cursor-pointer transition-all duration-200 border hover:border-primary/50 hover:shadow-md hover:-translate-y-1">
                                <Image src={hub.image} alt={hub.name} width={80} height={80} className="rounded-md object-cover h-16 w-16" data-ai-hint={hub.imageHint} />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold break-words">{hub.name}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-2 break-words">{hub.description}</p>
                                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                                        <Users className="h-3 w-3 mr-1" />
                                        {hub.members} Members
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
