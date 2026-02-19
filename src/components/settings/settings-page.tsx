
'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Shield, Bell, AtSign, Bookmark, Palette, Sun, Moon, Rows, Columns, Trophy, MessageSquare } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFeed } from "@/context/feed-context";
import ActivityFeed from "../dashboard/activity-feed";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useTheme } from "@/context/theme-context";

const settingsNav = [
    { id: "account", title: "Account", icon: User },
    { id: "appearance", title: "Appearance", icon: Palette },
    { id: "privacy", title: "Privacy & Safety", icon: Shield },
    { id: "notifications", title: "Notifications", icon: Bell },
    { id: "saved", title: "Saved Posts", icon: Bookmark },
]

export default function SettingsComponent() {
    const [activeTab, setActiveTab] = useState("account");

    return (
        <div className="mx-auto max-w-6xl">
             <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>
            <div className="grid md:grid-cols-[240px_1fr] gap-10 items-start">
                <nav className="flex flex-col gap-2 text-muted-foreground">
                    {settingsNav.map(item => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                                activeTab === item.id ? "bg-primary/10 text-primary" : "hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                           <item.icon className="h-4 w-4" />
                           {item.title}
                        </button>
                    ))}
                </nav>
                <div className="grid gap-6">
                    {activeTab === 'account' && <AccountSettings />}
                    {activeTab === 'appearance' && <AppearanceSettings />}
                    {activeTab === 'privacy' && <PrivacySettings />}
                    {activeTab === 'notifications' && <NotificationSettings />}
                    {activeTab === 'saved' && <SavedPosts />}
                </div>
            </div>
        </div>
    );
}

function AccountSettings() {
     return (
        <Card>
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your public profile and account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button variant="outline">Change Username</Button>
                <Button variant="outline">Change Email</Button>
                <Separator />
                <Button variant="destructive">Delete Account</Button>
            </CardContent>
        </Card>
    )
}

function AppearanceSettings() {
    const { theme, setTheme } = useTheme();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the app.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label className="font-semibold">Theme</Label>
                    <RadioGroup 
                        value={theme}
                        onValueChange={(value) => setTheme(value as 'light' | 'dark')} 
                        className="grid grid-cols-2 gap-4"
                    >
                       <div>
                           <RadioGroupItem value="light" id="light" className="peer sr-only" />
                           <Label htmlFor="light" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors">
                               <Sun className="mb-3 h-6 w-6" />
                               Light
                           </Label>
                       </div>
                       <div>
                           <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                           <Label htmlFor="dark" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors">
                               <Moon className="mb-3 h-6 w-6" />
                               Dark
                           </Label>
                       </div>
                    </RadioGroup>
                </div>
                 <div className="space-y-2">
                    <Label className="font-semibold">Layout</Label>
                     <RadioGroup defaultValue="cozy" className="grid grid-cols-2 gap-4">
                       <div>
                           <RadioGroupItem value="cozy" id="cozy" className="peer sr-only" />
                           <Label htmlFor="cozy" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors">
                               <Rows className="mb-3 h-6 w-6" />
                               Cozy
                           </Label>
                       </div>
                       <div>
                           <RadioGroupItem value="compact" id="compact" className="peer sr-only" />
                           <Label htmlFor="compact" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors">
                               <Columns className="mb-3 h-6 w-6" />
                               Compact
                           </Label>
                       </div>
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>
    )
}

function PrivacySettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Privacy & Safety</CardTitle>
                <CardDescription>Control who can see your activity and contact you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                    <div>
                        <Label htmlFor="dms" className="font-semibold">Allow direct messages from</Label>
                        <p className="text-xs text-muted-foreground">Control who can send you DMs.</p>
                    </div>
                    <Button variant="outline" size="sm">Everyone</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                     <div>
                        <Label htmlFor="activity" className="font-semibold">Show activity status</Label>
                        <p className="text-xs text-muted-foreground">Let others see when you're online.</p>
                    </div>
                    <Switch id="activity" defaultChecked />
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                     <div>
                        <Label htmlFor="game-activity" className="font-semibold">Show current game activity</Label>
                        <p className="text-xs text-muted-foreground">Display the game you're currently playing.</p>
                    </div>
                    <Switch id="game-activity" defaultChecked />
                </div>
            </CardContent>
        </Card>
    )
}

function NotificationSettings() {
    const notifications = [
        { id: "mentions", label: "Mentions and Replies", icon: AtSign, description: "When someone mentions you or replies to your post.", defaultChecked: true },
        { id: "dms", label: "Direct Messages", icon: MessageSquare, description: "When you receive a new direct message.", defaultChecked: true },
        { id: "tournaments", label: "Tournament Updates", icon: Trophy, description: "Reminders and updates for tournaments you've joined.", defaultChecked: true },
    ]
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choose which notifications you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {notifications.map(notif => (
                     <div key={notif.id} className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                        <div className="flex items-start gap-3">
                             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 mt-1">
                                <notif.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <Label htmlFor={notif.id} className="font-semibold leading-none">{notif.label}</Label>
                                <p className="text-xs text-muted-foreground mt-1">{notif.description}</p>
                            </div>
                        </div>
                        <Switch id={notif.id} defaultChecked={notif.defaultChecked} />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

function SavedPosts() {
    const { feedItems } = useFeed();
    const savedItems = feedItems.filter(item => item.social.bookmarked);

    // This is a temporary fix to make the old ActivityFeed component work
    const legacySavedPosts = savedItems.map(item => ({
        id: item.id,
        author: item.user.username,
        avatar: item.user.avatar,
        avatarHint: item.user.avatarHint,
        time: 'some time ago',
        content: item.caption,
        image: item.image,
        imageHint: item.imageHint,
        likes: item.engagement.likes,
        commentsCount: item.engagement.comments,
        liked: item.social.liked,
        saved: item.social.bookmarked,
    }))


    return (
        <Card>
             <CardHeader>
                <CardTitle>Saved Posts</CardTitle>
                <CardDescription>View all the posts you've bookmarked.</CardDescription>
            </CardHeader>
            <CardContent>
                {legacySavedPosts.length > 0 ? (
                    <ActivityFeed feedItems={legacySavedPosts} />
                ) : (
                    <p className="text-sm text-muted-foreground">You have no saved posts yet.</p>
                )}
            </CardContent>
        </Card>
    )
}
