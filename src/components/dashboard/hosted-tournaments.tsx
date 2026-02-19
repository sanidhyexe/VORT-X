
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Gamepad2,
  Calendar,
  Users,
  Trophy,
  MoreVertical,
  Shield,
} from 'lucide-react'
import { useTournaments } from '@/context/tournament-context'
import Link from 'next/link'

export default function HostedTournaments() {
  const { tournaments } = useTournaments()
  const hostedTournaments = tournaments.filter(t => t.host === 'YUV-X')

  return (
    <Card className="shadow-lg transition-all duration-300 hover:shadow-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-lg">
            Hosted Tournaments
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {hostedTournaments.length > 0 ? (
          <div className="space-y-4">
            {hostedTournaments.map(tournament => (
              <div
                key={tournament.id}
                className="flex flex-col gap-3 rounded-lg border p-4 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold break-words">{tournament.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Gamepad2 className="h-3 w-3 mr-1.5" />
                      <span>{tournament.game}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground flex-wrap gap-2">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(tournament.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span>
                        {tournament.registrations.length} /{' '}
                        {tournament.participants} players
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="h-4 w-4" />
                      <span>${tournament.prize}</span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      tournament.status === 'Open'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {tournament.status}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" asChild className="w-fit">
                  <Link
                    href={`/profile/hosted-tournaments/${tournament.id}`}
                  >
                    Manage Tournament
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-center text-muted-foreground">You haven't hosted any tournaments yet.</p>
        )}
      </CardContent>
    </Card>
  )
}
