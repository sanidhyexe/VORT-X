

'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Trophy, Gamepad2, ChevronLeft, BarChart, ExternalLink, Star, Plus, Upload, Image as ImageIcon, Info } from "lucide-react";
import TournamentRegistrationForm from '@/components/dashboard/tournament-registration-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import Link from 'next/link';
import { useTournaments, Tournament } from '@/context/tournament-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';


const gamesData = [
    {
        id: 11,
        title: "Battlegrounds Mobile India",
        genre: "Mobile Battle Royale",
        rating: 4.6,
        image: "https://drive.google.com/file/d/1Nh1xQzjtcCwIq2mbLZfQqDfNT4ZBiqmP/view?usp=sharing",
        imageHint: "bgmi game characters",
        description: "India's most loved battle royale game. Drop in, loot, and survive to be the last one standing.",
        websiteUrl: "https://www.battlegroundsmobileindia.com/",
        stats: { activePlayers: "100M+", prizePools: "$1M+", tournaments: "1000+" }
    },
    {
        id: 13,
        title: "Garena Free Fire",
        genre: "Mobile Battle Royale",
        rating: 4.4,
        image: "https://placehold.co/600x400.png",
        imageHint: "free fire characters",
        description: "A fast-paced battle royale game on mobile. 50 players, 10 minutes, 1 survivor.",
        websiteUrl: "https://ff.garena.com/",
        stats: { activePlayers: "400M+", prizePools: "$2M+", tournaments: "2500+" }
    },
    {
        id: 2,
        title: "Valorant",
        genre: "Tactical Shooter",
        rating: 4.9,
        image: "https://placehold.co/600x400.png",
        imageHint: "valorant agent shooting",
        description: "A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities.",
        websiteUrl: "https://playvalorant.com/",
        stats: { activePlayers: "28M+", prizePools: "$5M+", tournaments: "800+" }
    },
    {
        id: 1,
        title: "League of Legends",
        genre: "MOBA",
        rating: 4.7,
        image: "https://placehold.co/600x400.png",
        imageHint: "league legends splash art",
        description: "A team-based strategy game where two teams of five powerful champions face off to destroy the other’s base.",
        websiteUrl: "https://www.leagueoflegends.com/",
        stats: { activePlayers: "150M+", prizePools: "$10M+", tournaments: "1000+" }
    },
    {
        id: 3,
        title: "Counter-Strike 2",
        genre: "Tactical Shooter",
        rating: 4.8,
        image: "https://placehold.co/600x400.png",
        imageHint: "counter strike soldier",
        description: "The next chapter in the world's elite tactical FPS, building on the legacy of Counter-Strike: Global Offensive.",
        websiteUrl: "https://www.counter-strike.net/",
        stats: { activePlayers: "35M+", prizePools: "$15M+", tournaments: "1200+" }
    },
    {
        id: 4,
        title: "Dota 2",
        genre: "MOBA",
        rating: 4.7,
        image: "https://placehold.co/600x400.png",
        imageHint: "dota 2 heroes fighting",
        description: "A multiplayer online battle arena (MOBA) video game developed and published by Valve.",
        websiteUrl: "https://www.dota2.com/",
        stats: { activePlayers: "40M+", prizePools: "$40M+", tournaments: "500+" }
    },
    {
        id: 5,
        title: "Mobile Legends: Bang Bang",
        genre: "Mobile MOBA",
        rating: 4.5,
        image: "https://placehold.co/600x400.png",
        imageHint: "mobile legends characters",
        description: "A fast-paced 5v5 MOBA for mobile. Join your friends in a brand new kind of MOBA showdown, and crush your opponents.",
        websiteUrl: "https://m.mobilelegends.com/",
        stats: { activePlayers: "100M+", prizePools: "$1M+", tournaments: "2000+" }
    },
    {
        id: 6,
        title: "Apex Legends",
        genre: "Battle Royale",
        rating: 4.7,
        image: "https://placehold.co/600x400.png",
        imageHint: "apex legends characters",
        description: "A free-to-play battle royale-hero shooter where legendary characters with powerful abilities team up to battle for fame and fortune.",
        websiteUrl: "https://www.ea.com/games/apex-legends",
        stats: { activePlayers: "70M+", prizePools: "$7M+", tournaments: "700+" }
    },
    {
        id: 7,
        title: "Rocket League",
        genre: "Vehicular Soccer",
        rating: 4.8,
        image: "https://placehold.co/600x400.png",
        imageHint: "rocket league car",
        description: "A high-powered hybrid of arcade-style soccer and vehicular mayhem with easy-to-understand controls and fluid, physics-driven competition.",
        websiteUrl: "https://www.rocketleague.com/",
        stats: { activePlayers: "90M+", prizePools: "$6M+", tournaments: "1500+" }
    },
    {
        id: 8,
        title: "Fortnite",
        genre: "Battle Royale",
        rating: 4.6,
        image: "https://placehold.co/600x400.png",
        imageHint: "fortnite characters",
        description: "A massive online multiplayer game where you can build, battle, and create. Drop into a 100-player battle royale or explore new experiences.",
        websiteUrl: "https://www.fortnite.com/",
        stats: { activePlayers: "250M+", prizePools: "$30M+", tournaments: "1000+" }
    },
    {
        id: 9,
        title: "Call of Duty: Mobile",
        genre: "Mobile Shooter",
        rating: 4.7,
        image: "https://placehold.co/600x400.png",
        imageHint: "call of duty mobile soldier",
        description: "Experience the iconic Call of Duty multiplayer maps and modes anytime, anywhere.",
        websiteUrl: "https://www.callofduty.com/mobile",
        stats: { activePlayers: "300M+", prizePools: "$2M+", tournaments: "1500+" }
    },
    {
        id: 10,
        title: "Street Fighter 6",
        genre: "Fighting Game",
        rating: 4.9,
        image: "https://placehold.co/600x400.png",
        imageHint: "street fighter fight",
        description: "The latest evolution of the Street Fighter series, featuring innovative new gameplay features and enhanced visuals for the entire genre.",
        websiteUrl: "https://www.streetfighter.com/6/",
        stats: { activePlayers: "5M+", prizePools: "$2M+", tournaments: "600+" }
    },
    {
        id: 12,
        title: "EA Sports FC 24",
        genre: "Sports",
        rating: 4.5,
        image: "https://placehold.co/600x400.png",
        imageHint: "fc 24 soccer",
        description: "Welcome to the Club. EA SPORTS FC™ 24 is the next chapter in a more innovative future of football, bringing you closer to the game.",
        websiteUrl: "https://www.ea.com/games/ea-sports-fc/fc-24",
        stats: { activePlayers: "100M+", prizePools: "$1M+", tournaments: "3000+" }
    },
    {
        id: 14,
        title: "E-Cricket",
        genre: "Sports Simulation",
        rating: 4.3,
        image: "https://placehold.co/600x400.png",
        imageHint: "cricket game",
        description: "Experience the thrill of cricket on your screen. Bat, bowl, and field your way to victory.",
        websiteUrl: "#",
        stats: { activePlayers: "10M+", prizePools: "$500K+", tournaments: "400+" }
    },
    {
        id: 15,
        title: "Chess",
        genre: "Strategy",
        rating: 4.9,
        image: "https://placehold.co/600x400.png",
        imageHint: "chess board",
        description: "The classic game of strategy and tactics. Compete against players from around the world.",
        websiteUrl: "https://www.chess.com",
        stats: { activePlayers: "100M+", prizePools: "$3M+", tournaments: "10000+" }
    }
];

const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function GameTournamentsPage() {
    const params = useParams();
    const gameTitle = decodeURIComponent(params.gameTitle as string);
    
    const { getTournamentsByGame, addTournament } = useTournaments();
    const tournaments = getTournamentsByGame(gameTitle);
    const gameData = gamesData.find(g => g.title === gameTitle);

    const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isHostDialogOpen, setIsHostDialogOpen] = useState(false);
    
    const { toast } = useToast();
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    const handleRegisterClick = (tournament: Tournament) => {
        setSelectedTournament(tournament);
        setIsFormOpen(true);
    };

    const handleCloseHostDialog = () => {
        setIsHostDialogOpen(false);
        setLogoPreview(null);
        setBannerPreview(null);
    }

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

    const handleHostFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const selectedGameTitle = formData.get('game') as string;
        const selectedGameData = gamesData.find(g => g.title === selectedGameTitle);
        
        const newTournament = {
            id: Date.now(),
            name: formData.get('name') as string,
            game: selectedGameTitle,
            date: formData.get('date') as string,
            prize: parseFloat((formData.get('prize') as string).replace('$', '')),
            participants: parseInt(formData.get('participants') as string),
            status: 'Open' as const,
            rules: formData.get('rules') as string,
            host: 'YUV-X',
            bannerImage: bannerPreview || `https://placehold.co/1200x300.png`,
            bannerImageHint: 'tournament banner',
            logoImage: logoPreview || selectedGameData?.image || `https://placehold.co/128x128.png`,
            logoImageHint: logoPreview ? 'tournament logo' : selectedGameData?.imageHint || 'game logo',
            requireFullTeam: !!formData.get('requireFullTeam'),
        };
        addTournament(newTournament);
        handleCloseHostDialog();
        toast({
            title: "Tournament Hosted!",
            description: "Your new tournament has been created and is now live.",
        });
    }

    if (!gameData) {
        return (
             <div className="container p-4 sm:p-6">
                 <p>Game not found.</p>
            </div>
        )
    }

    return (
        <>
            <div className="container p-4 sm:p-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <div>
                        <Button asChild variant="ghost" className="mb-4 -ml-4">
                        <Link href="/games">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to All Games
                        </Link>
                        </Button>

                        <Card className="overflow-hidden">
                        <div className="relative h-48 w-full">
                            <Image src={gameData.image} alt={gameData.title} layout="fill" className="object-cover" data-ai-hint={gameData.imageHint}/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <CardHeader className="border-b">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="w-fit">{gameData.genre}</Badge>
                                            <div className="flex items-center gap-1 text-lg text-accent font-bold shrink-0">
                                                <Star className="h-5 w-5 fill-accent"/>
                                                {gameData.rating.toFixed(1)}
                                            </div>
                                        </div>
                                        <CardTitle className="text-2xl font-headline mt-2">{gameData.title}</CardTitle>
                                        <CardDescription className="pt-2">{gameData.description}</CardDescription>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                                        <Button onClick={() => setIsHostDialogOpen(true)}><Plus className="mr-2 h-4 w-4"/> Host a Tournament</Button>
                                        <Button variant="ghost" asChild>
                                        <a href={gameData.websiteUrl} target="_blank" rel="noopener noreferrer">
                                                Official Website <ExternalLink className="ml-2 h-4 w-4" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <h3 className="text-sm font-medium text-muted-foreground mb-3">Community Stats</h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <Users className="h-6 w-6 mx-auto text-primary mb-1"/>
                                        <p className="font-bold text-lg">{gameData.stats.activePlayers}</p>
                                        <p className="text-xs text-muted-foreground">Players</p>
                                    </div>
                                    <div>
                                        <Trophy className="h-6 w-6 mx-auto text-primary mb-1"/>
                                        <p className="font-bold text-lg">{gameData.stats.prizePools}</p>
                                        <p className="text-xs text-muted-foreground">Prizes</p>
                                    </div>
                                    <div>
                                        <BarChart className="h-6 w-6 mx-auto text-primary mb-1"/>
                                        <p className="font-bold text-lg">{gameData.stats.tournaments}</p>
                                        <p className="text-xs text-muted-foreground">Tournaments</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Separator />

                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Gamepad2 className="h-6 w-6 text-primary" />
                            <h2 className="text-2xl font-bold break-words">
                                Upcoming Tournaments
                            </h2>
                        </div>

                        {tournaments.length > 0 ? (
                            <div className="space-y-4">
                                {tournaments.map((tournament) => (
                                    <Card key={tournament.id} className="transition-all duration-300 hover:shadow-primary/20">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div className='flex items-center gap-4'>
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={tournament.logoImage} alt={tournament.name} data-ai-hint={tournament.logoImageHint} />
                                                        <AvatarFallback>{tournament.game.substring(0,2)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle className="text-lg font-headline break-words">{tournament.name}</CardTitle>
                                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                                            <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {new Date(tournament.date).toLocaleDateString()}</div>
                                                            <div className="flex items-center gap-1.5"><Trophy className="h-3 w-3" /> ${tournament.prize}</div>
                                                            <div className="flex items-center gap-1.5"><Users className="h-3 w-3" /> {tournament.participants} Players</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge variant={tournament.status === 'Open' ? 'default' : 'secondary'}>
                                                    {tournament.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex gap-2">
                                            <Button 
                                                onClick={() => handleRegisterClick(tournament)}
                                                disabled={tournament.status !== 'Open'}
                                            >
                                                Register Now
                                            </Button>
                                            <Button variant="outline" asChild>
                                                <Link href={`/tournaments/${tournament.id}`}>
                                                    <Info className="mr-2 h-4 w-4"/>
                                                    View Details
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No upcoming tournaments for {gameTitle}. Why not host one?</p>
                        )}
                    </div>
                </div>
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                <TournamentRegistrationForm tournament={selectedTournament!} onFormSubmit={() => setIsFormOpen(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={isHostDialogOpen} onOpenChange={handleCloseHostDialog}>
                <DialogContent className="sm:max-w-lg p-0">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle>Host a Tournament</DialogTitle>
                        <DialogDescription>
                        Fill in the details below to create your tournament. Click create when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleHostFormSubmit}>
                        <ScrollArea className="max-h-[70vh]">
                            <div className="p-6 pt-2 space-y-4">
                                <div className="relative mb-12 mt-4">
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
                                            "absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-secondary flex items-center justify-center cursor-pointer border-4 border-background group",
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="game">Game</Label>
                                        <Select required name="game" defaultValue={gameTitle}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {gamesData.map((game) => (
                                                    <SelectItem key={game.id} value={game.title}>
                                                        {game.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Tournament Name</Label>
                                        <Input id="name" name="name" placeholder="Summer Championship" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="date">Date/Time</Label>
                                        <Input id="date" name="date" type="datetime-local" required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="prize">Prize Pool</Label>
                                        <Input id="prize" name="prize" placeholder="$100" required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="participants">Max Players</Label>
                                        <Input id="participants" name="participants" type="number" placeholder="16" required/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rules">Rules</Label>
                                    <Textarea id="rules" name="rules" placeholder="Enter tournament rules..." required/>
                                </div>
                                <div className="flex items-center space-x-2 rounded-lg border p-4">
                                    <Users className="h-5 w-5 text-primary" />
                                    <div className="flex-1 space-y-1">
                                        <Label htmlFor="requireFullTeam">Require Full Team Roster</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Enable this to require participants to list all team members on registration.
                                        </p>
                                    </div>
                                    <Switch id="requireFullTeam" name="requireFullTeam" defaultChecked/>
                                </div>
                            </div>
                        </ScrollArea>
                        <DialogFooter className="bg-muted/50 p-4 mt-auto">
                            <Button type="button" variant="ghost" onClick={handleCloseHostDialog}>Cancel</Button>
                            <Button type="submit">Create Tournament</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}


