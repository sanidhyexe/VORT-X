

'use client';

import { Suspense, useState, useRef } from "react";
import { Gamepad2, Plus, Upload, Image as ImageIcon, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTournaments } from "@/context/tournament-context";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";


const games = [
    {
        id: 11,
        title: "Battlegrounds Mobile India",
        image: "/home/user/studio/IMAGES/peakpx.jpg",
        imageHint: "bgmi game characters",
    },
    {
        id: 13,
        title: "Garena Free Fire",
        image: "https://placehold.co/600x400.png",
        imageHint: "free fire characters",
    },
    {
        id: 2,
        title: "Valorant",
        image: "https://placehold.co/600x400.png",
        imageHint: "valorant agent shooting",
    },
    {
        id: 1,
        title: "League of Legends",
        image: "https://placehold.co/600x400.png",
        imageHint: "league legends splash art",
    },
    {
        id: 3,
        title: "Counter-Strike 2",
        image: "https://placehold.co/600x400.png",
        imageHint: "counter strike soldier",
    },
    {
        id: 4,
        title: "Dota 2",
        image: "https://placehold.co/600x400.png",
        imageHint: "dota 2 heroes fighting",
    },
    {
        id: 5,
        title: "Mobile Legends: Bang Bang",
        image: "https://placehold.co/600x400.png",
        imageHint: "mobile legends characters",
    },
    {
        id: 6,
        title: "Apex Legends",
        image: "https://placehold.co/600x400.png",
        imageHint: "apex legends characters",
    },
    {
        id: 7,
        title: "Rocket League",
        image: "https://placehold.co/600x400.png",
        imageHint: "rocket league car",
    },
    {
        id: 8,
        title: "Fortnite",
        image: "https://placehold.co/600x400.png",
        imageHint: "fortnite characters",
    },
    {
        id: 9,
        title: "Call of Duty: Mobile",
        image: "https://placehold.co/600x400.png",
        imageHint: "call of duty mobile soldier",
    },
    {
        id: 10,
        title: "Street Fighter 6",
        image: "https://placehold.co/600x400.png",
        imageHint: "street fighter fight",
    },
    {
        id: 12,
        title: "EA Sports FC 24",
        image: "https://placehold.co/600x400.png",
        imageHint: "fc 24 soccer",
    },
    {
        id: 14,
        title: "E-Cricket",
        image: "https://placehold.co/600x400.png",
        imageHint: "cricket game",
    },
    {
        id: 15,
        title: "Chess",
        image: "https://placehold.co/600x400.png",
        imageHint: "chess board",
    }
];

type Game = typeof games[0];

const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function GamesPageContent() {
  const [isHostDialogOpen, setIsHostDialogOpen] = useState(false);
  const { addTournament } = useTournaments();
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

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
      const gameTitle = formData.get('game') as string;

      if (!gameTitle) {
        toast({
          title: "Please select a game.",
          variant: "destructive",
        });
        return;
      }
      
      const selectedGameData = games.find(g => g.title === gameTitle);
      
      const newTournament = {
          name: formData.get('name') as string,
          game: gameTitle,
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

  return (
    <>
        <div className="container p-4 sm:p-6">
             <div className="mb-6">
                <div className="flex items-center gap-3">
                    <Gamepad2 className="h-6 w-6 text-primary"/>
                    <h1 className="text-2xl font-bold">Games</h1>
                </div>
                <p className="text-muted-foreground">Browse and discover new games to play and compete in.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {games.map(game => (
                    <Link href={`/games/${encodeURIComponent(game.title)}`} key={game.id} className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:scale-105">
                        <Image 
                            src={game.image} 
                            alt={game.title} 
                            fill
                            className="object-cover" 
                            data-ai-hint={game.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                            <h3 className="font-semibold text-white text-sm break-words">{game.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
      </div>
      <Button 
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg" 
        size="icon"
        onClick={() => setIsHostDialogOpen(true)}
      >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Host Tournament</span>
      </Button>

      <Dialog open={isHostDialogOpen} onOpenChange={setIsHostDialogOpen}>
          <DialogContent className="sm:max-w-lg p-0">
              <DialogHeader className="p-6 pb-0">
                  <DialogTitle>Host a Tournament</DialogTitle>
                  <DialogDescription>
                  Fill in the details below to create your tournament. Click create when you're done.
                  </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleHostFormSubmit} className="flex flex-col h-full">
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
                                  <Select required name="game">
                                      <SelectTrigger>
                                          <SelectValue placeholder="Select a game"/>
                                      </SelectTrigger>
                                      <SelectContent>
                                          {games.map((game) => (
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

export default function GamesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GamesPageContent />
        </Suspense>
    )
}

    
