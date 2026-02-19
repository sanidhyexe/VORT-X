
'use client';

import { useTournaments, Tournament } from "@/context/tournament-context";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Copy, KeyRound, Check } from "lucide-react";
import { useState } from "react";

interface CredentialedTournament extends Tournament {
    gameId: string;
    gamePassword: string;
}

export default function TournamentCredentialsCard() {
    const { tournaments } = useTournaments();
    const { toast } = useToast();
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [copiedPassword, setCopiedPassword] = useState<number | null>(null);

    const credentialedTournaments = tournaments.filter(
        (t): t is CredentialedTournament =>
            !!t.gameId &&
            !!t.gamePassword &&
            (t.status === "Open" || t.status === "In Progress") &&
            t.registrations.some(r => r.members.some(m => m.name === 'YUV-X' || m.name === 'YUV-X'))
    );

    const handleCopy = (text: string, type: 'id' | 'password', tournamentId: number) => {
        navigator.clipboard.writeText(text);
        
        if (type === 'id') {
            setCopiedId(tournamentId);
            setTimeout(() => setCopiedId(null), 2000);
        } else {
            setCopiedPassword(tournamentId);
            setTimeout(() => setCopiedPassword(null), 2000);
        }
        
        toast({
            title: "Copied to clipboard!",
        });
    }

    if (credentialedTournaments.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            {credentialedTournaments.map(tournament => (
                <Alert key={tournament.id} variant="default" className="border-primary/50 bg-primary/5">
                    <KeyRound className="h-4 w-4 text-primary" />
                    <AlertTitle className="font-bold text-primary">
                        Game Credentials for "{tournament.name}"
                    </AlertTitle>
                    <AlertDescription>
                        The host has sent the lobby details. Good luck!
                    </AlertDescription>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 space-y-2">
                            <p className="text-sm font-semibold">Lobby ID</p>
                            <div className="flex items-center gap-2">
                                <p className="flex-1 rounded-md border bg-secondary px-3 py-2 font-mono text-sm">
                                    {tournament.gameId}
                                </p>
                                <Button size="icon" variant="outline" onClick={() => handleCopy(tournament.gameId, 'id', tournament.id)}>
                                    {copiedId === tournament.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <p className="text-sm font-semibold">Password</p>
                             <div className="flex items-center gap-2">
                                <p className="flex-1 rounded-md border bg-secondary px-3 py-2 font-mono text-sm">
                                    {tournament.gamePassword}
                                </p>
                                <Button size="icon" variant="outline" onClick={() => handleCopy(tournament.gamePassword, 'password', tournament.id)}>
                                    {copiedPassword === tournament.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Alert>
            ))}
        </div>
    );
}
