

'use client';

import { useState } from "react";
import CommunityHubs from "@/components/dashboard/community-hubs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Users, Compass } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCommunities } from "@/context/community-context";
import { Card } from "@/components/ui/card";

export default function CommunitiesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  const { addCommunity } = useCommunities();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    if (!name || name.trim().length < 3) {
      toast({
        title: "Community name must be at least 3 characters.",
        variant: "destructive",
      });
      return;
    }

    addCommunity({
      name: name,
      description: description,
      image: `https://placehold.co/300x150.png`,
      imageHint: `${name} community`,
      type: 'permanent',
    });

    setIsCreateDialogOpen(false);
    toast({
      title: "Community Created!",
      description: `The "${name}" community is now live.`,
    });
  }

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center bg-secondary/30 p-8">
        <Card className="max-w-md text-center p-8">
            <Compass className="h-16 w-16 mx-auto text-primary mb-4" />
            <h1 className="text-2xl font-bold">Discover Communities</h1>
            <p className="text-muted-foreground mt-2">
                You're not in a server yet. Join an existing one or create your own to start collaborating with other gamers.
            </p>
             <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                  <Button className="mt-6">
                      <Plus className="mr-2" />
                      Create a Community
                  </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                      <DialogTitle>Create a Community</DialogTitle>
                      <DialogDescription>
                        Build a new hub for players to connect. Fill in the details below.
                      </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleFormSubmit}>
                      <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input id="name" name="name" placeholder="e.g., RPG Enthusiasts" className="col-span-3" required />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="description" className="text-right">
                                Description
                              </Label>
                              <Textarea id="description" name="description" placeholder="A place to discuss all things RPG." className="col-span-3" />
                          </div>
                      </div>
                      <DialogFooter>
                          <Button type="submit"><Users className="mr-2" />Create Community</Button>
                      </DialogFooter>
                  </form>
              </DialogContent>
            </Dialog>
        </Card>
      </div>

    </>
  );
}
