
'use client'

import { useParams, notFound, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useTournaments, Registration, Feedback, KickRequest, Announcement } from '@/context/tournament-context'
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
  Shield,
  FileText,
  Youtube,
  Settings,
  Bell,
  Trash2,
  Star,
  MessageSquare,
  AlertOctagon,
  Check,
  X,
  Image as ImageIcon,
  Upload,
  Megaphone,
  KeyRound,
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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { useState, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import TournamentAnnouncementsCard from '@/components/dashboard/tournament-announcements-card'


const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function ManageTournamentPage() {
  const params = useParams()
  const { toast } = useToast()
  const router = useRouter()
  const { getTournamentById, removeTournament, addAnnouncement, updateKickRequestStatus, updateTournamentMedia, sendTournamentCredentials } = useTournaments()
  const tournamentId = parseInt(params.id as string)
  const tournament = getTournamentById(tournamentId)
  
  const [announcement, setAnnouncement] = useState('');
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false);
  const [isCredentialsDialogOpen, setIsCredentialsDialogOpen] = useState(false);
  const [gameId, setGameId] = useState('');
  const [gamePassword, setGamePassword] = useState('');

  const [logoPreview, setLogoPreview] = useState<string | null>(tournament?.logoImage || null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(tournament?.bannerImage || null);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);


  if (!tournament) {
    return notFound()
  }

  const handleDeleteTournament = () => {
    removeTournament(tournamentId)
    toast({
      title: 'Tournament Deleted',
      description: `The tournament "${tournament.name}" has been removed.`,
      variant: 'destructive',
    })
    router.push('/profile/hosted-tournaments')
  }

  const handleSendAnnouncement = () => {
    if (announcement.trim()) {
        addAnnouncement(tournament.id, announcement.trim())
        setAnnouncement('');
        setIsAnnouncementDialogOpen(false);
    }
  }

  const handleSendCredentials = () => {
    if (gameId && gamePassword) {
      sendTournamentCredentials(tournament.id, gameId, gamePassword);
      setGameId('');
      setGamePassword('');
      setIsCredentialsDialogOpen(false);
    } else {
      toast({
        title: "Missing Information",
        description: "Please provide both a Game ID and a Password.",
        variant: "destructive",
      })
    }
  }

  const handleKickRequest = (requestId: number, status: 'approved' | 'rejected') => {
    updateKickRequestStatus(tournamentId, requestId, status);
    toast({
        title: `Request ${status}`,
        description: `The player kick-off request has been updated.`,
    });
  }

  const averageRating = tournament.feedback.length > 0 
    ? (tournament.feedback.reduce((acc, f) => acc + f.rating, 0) / tournament.feedback.length)
    : 0;

  const pendingKickRequests = tournament.kickRequests.filter(req => req.status === 'pending');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
      const file = event.target.files?.[0];
      if (file) {
          const dataUri = await fileToDataUri(file);
          if (type === 'logo') {
              setLogoPreview(dataUri);
          } else {
              setBannerPreview(dataUri);
          }
      }
  }

  const handleMediaUpdate = () => {
    updateTournamentMedia(tournamentId, { logo: logoPreview, banner: bannerPreview });
    toast({
        title: "Media Updated",
        description: "Your tournament banner and logo have been changed."
    })
    setIsMediaDialogOpen(false);
  }

  return (
      <div className="container p-4 sm:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <Button asChild variant="ghost" className="-ml-4">
            <Link href="/profile/hosted-tournaments">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Hosted Tournaments
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
                    Managing dashboard for your tournament.
                  </CardDescription>
                </div>
                 <div className="flex gap-2 flex-wrap">
                    <Dialog open={isCredentialsDialogOpen} onOpenChange={setIsCredentialsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button><KeyRound className="mr-2"/>Send Credentials</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Send Game Credentials</DialogTitle>
                                <DialogDescription>
                                    Enter the lobby ID and password. This will be sent to all registered participants.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="game-id">Lobby ID</Label>
                                  <Input 
                                      id="game-id"
                                      placeholder="e.g., A58DFG"
                                      value={gameId}
                                      onChange={(e) => setGameId(e.target.value)}
                                  />
                                </div>
                                 <div className="space-y-2">
                                  <Label htmlFor="game-password">Password</Label>
                                  <Input 
                                      id="game-password"
                                      placeholder="e.g., spike123"
                                      value={gamePassword}
                                      onChange={(e) => setGamePassword(e.target.value)}
                                  />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsCredentialsDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleSendCredentials}>Send to Participants</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline"><Megaphone className="mr-2"/>Post Announcement</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Post an Announcement</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <Label htmlFor="announcement-message">Announcement</Label>
                                <Textarea 
                                    id="announcement-message"
                                    placeholder="e.g., Round 2 matches will begin in 15 minutes."
                                    value={announcement}
                                    onChange={(e) => setAnnouncement(e.target.value)}
                                />
                            </div>
                            <DialogFooter>
                                <Button onClick={handleSendAnnouncement}>Post to Participants</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive"><Trash2 className="mr-2"/>Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                tournament and all of its registration data.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteTournament}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
                    <Card>
                        <CardHeader className="flex-row items-center gap-3 space-y-0">
                            <Settings className="h-6 w-6 text-primary" />
                            <CardTitle className="text-lg">Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Manage tournament media and streaming details.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Dialog open={isMediaDialogOpen} onOpenChange={setIsMediaDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="flex-grow">
                                            <ImageIcon className="mr-2"/> Manage Media
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Manage Media</DialogTitle>
                                            <CardDescription>Update your tournament's logo and banner.</CardDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <div className="relative mb-16">
                                                <input
                                                    type="file"
                                                    ref={bannerInputRef}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'banner')}
                                                />
                                                <div
                                                    className={cn(
                                                        "h-36 w-full rounded-lg bg-secondary flex items-center justify-center cursor-pointer group",
                                                        bannerPreview && "bg-cover bg-center"
                                                    )}
                                                    style={{ backgroundImage: bannerPreview ? `url(${bannerPreview})` : 'none' }}
                                                    onClick={() => bannerInputRef.current?.click()}
                                                >
                                                    {!bannerPreview && (
                                                        <div className="text-center text-muted-foreground group-hover:text-primary transition-colors">
                                                            <Upload className="mx-auto h-8 w-8" />
                                                            <p className="text-sm font-semibold">Upload Banner Image</p>
                                                            <p className="text-xs">Recommended: 1200x300</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <input
                                                    type="file"
                                                    ref={logoInputRef}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'logo')}
                                                />
                                                <div
                                                    className={cn(
                                                        "absolute -bottom-12 left-8 h-24 w-24 rounded-full bg-secondary flex items-center justify-center cursor-pointer border-4 border-background group",
                                                        logoPreview && "bg-cover bg-center"
                                                    )}
                                                    style={{ backgroundImage: logoPreview ? `url(${logoPreview})` : 'none' }}
                                                    onClick={() => logoInputRef.current?.click()}
                                                >
                                                    {!logoPreview && (
                                                        <div className="text-center text-muted-foreground group-hover:text-primary transition-colors p-2">
                                                            <ImageIcon className="mx-auto h-6 w-6" />
                                                            <p className="text-xs font-semibold">Upload Logo</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="ghost" onClick={() => setIsMediaDialogOpen(false)}>Cancel</Button>
                                            <Button onClick={handleMediaUpdate}>Save Changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Button className="flex-grow" variant="secondary">
                                    <Youtube className="mr-2"/>Connect Stream
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
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

           <TournamentAnnouncementsCard tournament={tournament} />

          {pendingKickRequests.length > 0 && (
            <Card className="profile-card border-yellow-500/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                    <AlertOctagon className="h-6 w-6 text-yellow-500" />
                    <CardTitle>Player Kick Requests</CardTitle>
                </div>
                <CardDescription>
                  Review pending requests from participants to remove a player.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player to Kick</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingKickRequests.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium">{req.playerToKick}</TableCell>
                        <TableCell>{req.reason}</TableCell>
                        <TableCell>{req.requestingPlayer}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button size="icon" variant="outline" className="h-8 w-8 bg-green-500/10 text-green-500 hover:bg-green-500/20" onClick={() => handleKickRequest(req.id, 'approved')}>
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" className="h-8 w-8 bg-red-500/10 text-red-500 hover:bg-red-500/20" onClick={() => handleKickRequest(req.id, 'rejected')}>
                                <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {tournament.status === 'Finished' && (
            <Card className="profile-card">
              <CardHeader>
                <CardTitle>Feedback Summary</CardTitle>
                <CardDescription>
                  See what participants thought about the tournament.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {tournament.feedback.length > 0 ? (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center rounded-lg border p-6">
                      <h3 className="text-sm font-semibold text-muted-foreground">Average Rating</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-4xl font-bold">{averageRating.toFixed(1)}</p>
                        <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">from {tournament.feedback.length} ratings</p>
                    </div>
                    <div>
                      <h3 className="mb-4 text-base font-semibold">Comments</h3>
                      <ScrollArea className="h-[200px] w-full">
                        <div className="space-y-4 pr-4">
                          {tournament.feedback.map((fb, index) => (
                            <div key={index} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="https://placehold.co/40x40.png" />
                                <AvatarFallback>
                                  {fb.participantName.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 rounded-md bg-secondary p-3">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-semibold">{fb.participantName}</p>
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs font-bold">{fb.rating}</span>
                                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{fb.comment}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <p>No feedback has been submitted for this tournament yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
  )
}
