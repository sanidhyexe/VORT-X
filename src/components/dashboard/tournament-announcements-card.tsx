
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone } from "lucide-react";
import { useTournaments, Announcement, Tournament } from "@/context/tournament-context";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";

export default function TournamentAnnouncementsCard({ tournament }: { tournament: Tournament }) {
  if (tournament.announcements.length === 0) {
    return null;
  }
  
  return (
    <Card className="profile-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Megaphone className="h-6 w-6 text-primary" />
          <CardTitle>Announcements</CardTitle>
        </div>
        <CardDescription>
          Latest updates from the tournament host.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 pr-4">
          <div className="space-y-4">
            {tournament.announcements.map((announcement) => (
              <div key={announcement.id} className="flex flex-col rounded-lg border bg-secondary/30 p-4">
                <p className="text-sm text-foreground">{announcement.content}</p>
                <p className="text-xs text-muted-foreground mt-2 self-end">
                  {formatDistanceToNow(new Date(announcement.timestamp), { addSuffix: true })}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
