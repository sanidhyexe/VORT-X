
'use client';

import { useTournaments, Tournament } from "@/context/tournament-context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";
import Link from "next/link";

export default function LiveTournamentAlert() {
    const { tournaments } = useTournaments();

    // This logic ensures the alert only shows for tournaments that are "In Progress"
    // AND where the user is either the host or a registered participant.
    const liveTournaments = tournaments.filter(
        (t) =>
            t.status === "In Progress" &&
            (t.host === 'YUV-X' || t.registrations.some(r => r.members.some(m => m.name === 'YUV-X' || m.name === 'YUV-X')))
    );

    if (liveTournaments.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            {liveTournaments.map(tournament => (
                <Alert key={tournament.id} variant="default" className="border-destructive/50 bg-destructive/5">
                    <Radio className="h-4 w-4 text-destructive animate-pulse" />
                    <AlertTitle className="font-bold text-destructive">
                        LIVE: Your tournament "{tournament.name}" is in progress!
                    </AlertTitle>
                    <AlertDescription>
                        The matches have begun. Jump in and join the action.
                    </AlertDescription>
                    <div className="mt-4">
                        <Button variant="destructive" asChild>
                             <Link href={tournament.host === 'YUV-X' ? `/profile/hosted-tournaments/${tournament.id}` : `/tournaments/${tournament.id}`}>
                                Go to Tournament
                            </Link>
                        </Button>
                    </div>
                </Alert>
            ))}
        </div>
    );
}
