
'use client'

import { useParams, notFound, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useTournaments, Registration } from '@/context/tournament-context'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  Users,
  Trophy,
  Calendar,
  FileText,
  UserPlus
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import TournamentRegistrationForm from '@/components/dashboard/tournament-registration-form'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'
import TournamentAnnouncementsCard from '@/components/dashboard/tournament-announcements-card'

export default function TournamentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { getTournamentById } = useTournaments()
  const tournamentId = parseInt(params.id as string)
  const tournament = getTournamentById(tournamentId)
  
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!tournament) {
    return notFound()
  }

  return (
    <>
      <div className="container p-4 sm:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <Button asChild variant="ghost" className="-ml-4">
            <Link href={`/games/${encodeURIComponent(tournament.game)}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to {tournament.game}
            </Link>
          </Button>

          <Card className="profile-card overflow-hidden">
            {tournament.bannerImage && (
              <div className="relative h-48 w-full bg-secondary">
                <Image src={tournament.bannerImage} alt={`${tournament.name} banner`} layout="fill" className="object-cover" data-ai-hint={tournament.bannerImageHint} />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
            )}
            <CardHeader className="relative pt-12">
              <div className="absolute top-0 -translate-y-1/2 left-6">
                 <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={tournament.logoImage} alt={tournament.name} data-ai-hint={tournament.logoImageHint}/>
                    <AvatarFallback>{tournament.game.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="mt-2">
                  <CardTitle className="text-2xl font-headline break-words">
                    {tournament.name}
                  </CardTitle>
                  <CardDescription>
                    Hosted by {tournament.host}
                  </CardDescription>
                </div>
                 <div className="flex gap-2">
                    <Button onClick={() => setIsFormOpen(true)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Register Now
                    </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                <div className="rounded-lg border p-3">
                  <Trophy className="mx-auto mb-1 h-6 w-6 text-primary" />
                  <p className="font-semibold">${tournament.prize}</p>
                  <p className="text-muted-foreground">Prize Pool</p>
                </div>
                <div className="rounded-lg border p-3">
                  <Users className="mx-auto mb-1 h-6 w-6 text-primary" />
                  <p className="font-semibold">{tournament.registrations.length} / {tournament.participants}</p>
                  <p className="text-muted-foreground">Participants</p>
                </div>
                <div className="rounded-lg border p-3">
                  <Calendar className="mx-auto mb-1 h-6 w-6 text-primary" />
                  <p className="font-semibold">
                    {new Date(tournament.date).toLocaleDateString()}
                  </p>
                  <p className="text-muted-foreground">Date</p>
                </div>
                <div className="rounded-lg border p-3">
                    <Badge variant={tournament.status === 'Open' ? 'default' : tournament.status === 'Finished' ? 'outline' : 'secondary'} className="mx-auto">
                        {tournament.status}
                    </Badge>
                  <p className="text-muted-foreground mt-3.5">Status</p>
                </div>
              </div>
              <Separator className="my-6" />
                <div className="grid md:grid-cols-2 gap-6">
                    <TournamentAnnouncementsCard tournament={tournament} />
                     <Card>
                        <CardHeader className="flex-row items-center gap-3 space-y-0">
                            <FileText className="h-6 w-6 text-primary" />
                            <CardTitle className="text-lg">Rules & Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {tournament.rules}
                           </p>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
          </Card>

          <Card className="profile-card">
            <CardHeader>
              <CardTitle>Registered Participants</CardTitle>
              <CardDescription>
                List of all teams who have registered for this tournament.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tournament.registrations.length > 0 ? (
                    tournament.registrations.map((reg: Registration) => (
                      <TableRow key={reg.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="team logo" />
                              <AvatarFallback>
                                {reg.teamName.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{reg.teamName}</span>
                          </div>
                        </TableCell>
                         <TableCell>
                            <div className="flex flex-wrap gap-1">
                                {reg.members.map((member, index) => (
                                    <Badge key={index} variant="outline">{member.name}</Badge>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell>
                          {new Date(reg.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="default">Paid</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No participants yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent>
              <TournamentRegistrationForm tournament={tournament} onFormSubmit={() => setIsFormOpen(false)} />
          </DialogContent>
      </Dialog>
    </>
  )
}
