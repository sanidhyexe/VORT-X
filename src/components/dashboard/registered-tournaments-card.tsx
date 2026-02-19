
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2, Calendar, Ticket, Edit, AlertOctagon, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useTournaments, Tournament, Registration } from "@/context/tournament-context";
import TournamentFeedbackForm from './tournament-feedback-form';
import KickRequestForm from './kick-request-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface RegisteredTournament extends Tournament {
    registration: Registration;
}

export default function RegisteredTournamentsCard() {
  const { tournaments } = useTournaments();
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [isKickRequestDialogOpen, setIsKickRequestDialogOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  const registeredTournaments: RegisteredTournament[] = tournaments
    .map(t => {
        const registration = t.registrations.find(r => 
            r.members.some(m => m.name === "YUV-X")
        );
        return registration ? { ...t, registration } : null;
    })
    .filter((t): t is RegisteredTournament => t !== null);

  const handleFeedbackClick = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsFeedbackDialogOpen(true);
  };
  
  const handleKickRequestClick = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsKickRequestDialogOpen(true);
  }

  const upcomingTournaments = registeredTournaments.filter(t => t.status !== 'Finished');
  const pastTournaments = registeredTournaments.filter(t => t.status === 'Finished');

  const TournamentList = ({ list }: { list: RegisteredTournament[] }) => (
    <div className="space-y-4">
      {list.length > 0 ? (
        list.map((tournament) => (
          <div key={tournament.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-4 transition-all duration-200 hover:border-primary/50">
            <div className="flex-1 min-w-0">
              <p className="font-semibold break-words">{tournament.name}</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1 gap-4">
                  <div className="flex items-center gap-1.5">
                      <Gamepad2 className="h-3 w-3" />
                      <span>{tournament.game}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(tournament.date).toLocaleDateString()}</span>
                  </div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
              {tournament.status === "In Progress" ? (
                <>
                  <Badge variant="destructive" className="w-full justify-center sm:w-auto">In Progress</Badge>
                  <Button variant="secondary" size="sm" className="flex-1" asChild>
                    <Link href={`/dms?recipient=${encodeURIComponent(tournament.host)}&context=${encodeURIComponent(tournament.name)}`}>
                        <MessageSquare className="mr-2 h-4 w-4"/> Message Host
                    </Link>
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleKickRequestClick(tournament)}>
                      <AlertOctagon className="mr-2 h-4 w-4"/> Request Kick
                  </Button>
                </>
              ) : tournament.status === "Finished" ? (
                <>
                    <Badge variant="secondary" className="w-full justify-center sm:w-auto">{`Finished: ${tournament.registration.rank || 'N/A'}`}</Badge>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleFeedbackClick(tournament)}
                        disabled={tournament.registration.feedbackSubmitted}
                    >
                        <Edit className="mr-2 h-4 w-4"/>
                        {tournament.registration.feedbackSubmitted ? 'Feedback Sent' : 'Leave Feedback'}
                    </Button>
                </>
              ) : (
                 <>
                  <Badge className="w-full justify-center sm:w-auto">Registered</Badge>
                  <Button variant="secondary" size="sm" className="flex-1" asChild>
                    <Link href={`/dms?recipient=${encodeURIComponent(tournament.host)}&context=${encodeURIComponent(tournament.name)}`}>
                        <MessageSquare className="mr-2 h-4 w-4"/> Message Host
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">View Bracket</Button>
                 </>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-muted-foreground py-4 border rounded-lg">
            <p className="text-sm">No tournaments here.</p>
            <Button variant="link" asChild><Link href="/games">Browse Tournaments</Link></Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Card className="profile-card shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Ticket className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-lg">My Tournaments</CardTitle>
          </div>
           <CardDescription>Track your upcoming matches and past results.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4">
                <TournamentList list={upcomingTournaments} />
            </TabsContent>
            <TabsContent value="history" className="mt-4">
                <TournamentList list={pastTournaments} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {selectedTournament && (
        <>
            <TournamentFeedbackForm 
                isOpen={isFeedbackDialogOpen}
                onOpenChange={setIsFeedbackDialogOpen}
                tournament={selectedTournament}
            />
            <KickRequestForm
                isOpen={isKickRequestDialogOpen}
                onOpenChange={setIsKickRequestDialogOpen}
                tournament={selectedTournament}
            />
        </>
      )}
    </>
  );
}
