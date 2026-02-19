
'use client';

import PlayerProfileCard from "@/components/dashboard/player-profile-card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityFeed from "@/components/dashboard/activity-feed";
import { useFeed } from "@/context/feed-context";
import HostedTournaments from "@/components/dashboard/hosted-tournaments";
import RegisteredTournaments from "@/components/dashboard/registered-tournaments-card";
import { Button } from "@/components/ui/button";
import { Settings, LifeBuoy, LogOut } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
    const { feedItems } = useFeed();
    const userPosts = feedItems.filter(item => item.author === 'YUV-X' || item.author === 'YUV-X');
    const { toast } = useToast();

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <PlayerProfileCard />

            <div className="max-w-7xl mx-auto flex justify-end gap-2">
                <Link href="/settings">
                    <Button variant="outline"><Settings className="mr-2"/> Settings</Button>
                </Link>
                <a href="mailto:yuvx.co@gmail.com">
                    <Button variant="outline"><LifeBuoy className="mr-2"/> Support</Button>
                </a>
                <Button variant="destructive" onClick={() => toast({ title: "Logged out successfully." })}>
                    <LogOut className="mr-2"/> Log out
                </Button>
            </div>
            
            <Tabs defaultValue="activity" className="mx-auto max-w-2xl">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="hosted">Hosted</TabsTrigger>
                    <TabsTrigger value="registered">Registered</TabsTrigger>
                </TabsList>
                <TabsContent value="activity" className="mt-6">
                    <ActivityFeed feedItems={userPosts} />
                </TabsContent>
                <TabsContent value="hosted" className="mt-6">
                    <HostedTournaments />
                </TabsContent>
                 <TabsContent value="registered" className="mt-6">
                    <RegisteredTournaments />
                 </TabsContent>
            </Tabs>
        </div>
    )
}
