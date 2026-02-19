
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AtSign, MapPin } from "lucide-react";

export default function ProfileCard() {
  const displayName = 'YUV-X';
  const handle = 'YUV-X';

  return (
    <Card className="overflow-hidden shadow-lg transition-all duration-150 hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="relative h-24 bg-gradient-to-r from-primary to-accent">
            <Avatar className="absolute -bottom-10 left-6 h-20 w-20 border-4 border-background">
                <AvatarImage src={"https://placehold.co/100x100.png"} alt={displayName} data-ai-hint="gamer avatar" />
                <AvatarFallback>{displayName.substring(0,2)}</AvatarFallback>
            </Avatar>
        </div>
        <div className="pt-12 p-6 pb-2">
            <CardTitle className="font-headline text-2xl">{displayName}</CardTitle>
             <div className="flex items-center gap-4 text-muted-foreground mt-1">
                <div className="flex items-center gap-1 text-sm">
                    <AtSign className="h-4 w-4" />
                    <span>{handle}</span>
                </div>
                 <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>Gaming Universe</span>
                </div>
            </div>
            <p className="mt-2 text-sm text-foreground/80">
            Leveling up in life and in-game. Pro FPS player, RPG enthusiast, and indie game discoverer. Let's connect and conquer new worlds!
            </p>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
            <div>
                 <h4 className="text-sm font-medium text-muted-foreground mb-2">Preferred Games</h4>
                 <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-primary text-primary">Valorant</Badge>
                    <Badge variant="outline" className="border-primary text-primary">Cyberpunk 2077</Badge>
                    <Badge variant="outline" className="border-primary text-primary">Elden Ring</Badge>
                    <Badge variant="outline" className="border-primary text-primary">Hades</Badge>
                 </div>
            </div>

            <Button className="w-full bg-primary/20 text-primary-foreground hover:bg-primary/40">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
}
