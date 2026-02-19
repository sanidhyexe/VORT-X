
'use client';

import Link from "next/link";
import React, { useState } from "react";
import { Bell, Mail, Menu, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import AppSidebar from "./app-sidebar";
import { Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SearchBar from "./search-bar";

const VortXLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      className="h-8 w-auto"
      fill="currentColor"
    >
        <defs>
            <linearGradient id="header-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="stop-color-primary" />
                <stop offset="100%" className="stop-color-accent" />
            </linearGradient>
            <style>{`
                .stop-color-primary { stop-color: hsl(var(--primary)); }
                .stop-color-accent { stop-color: hsl(var(--accent)); }
            `}</style>
        </defs>
        <text x="10" y="40" fontFamily="'Space Grotesk', sans-serif" fontSize="40" fontWeight="bold" fill="url(#header-grad)">
            VORT-X
        </text>
    </svg>
);

const notifications = [
    {
    id: 5,
    type: 'credentials' as const,
    tournamentName: 'Valorant Champions Tour: EMEA',
    time: 'Just now',
    read: false,
  },
  {
    id: 1,
    type: 'new_follower' as const,
    user: 'GlitchHunter',
    avatar: 'https://placehold.co/40x40.png',
    avatarHint: 'female avatar',
    time: '5m ago',
    read: false,
  },
  {
    id: 2,
    type: 'comment' as const,
    user: 'PixelPioneer',
    avatar: 'https://placehold.co/40x40.png',
    avatarHint: 'male avatar',
    post: 'Cosmic Odyssey platinum trophy',
    time: '1h ago',
    read: false,
  },
  {
    id: 3,
    type: 'tournament_reminder' as const,
    game: 'Valorant Champions Tour: EMEA',
    time: 'Starts in 30 mins',
    read: true,
  },
  {
    id: 4,
    type: 'group_invite' as const,
    user: 'ApexPro',
    group: 'Apex Legends Pros',
    avatar: 'https://placehold.co/40x40.png',
    avatarHint: 'pro gamer avatar',
    time: '1d ago',
    read: true,
  }
];

export default function AppHeader() {
  const hasUnreadNotifications = notifications.some(n => !n.read);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16">
        <div className="flex items-center gap-2">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs p-0">
                   <AppSidebar isSheet={true}/>
                </SheetContent>
            </Sheet>
            <Link href="/" className="hidden sm:block">
                <VortXLogo />
            </Link>
        </div>

        <div className="flex-1 flex justify-center px-4">
            <div className="w-full max-w-md">
                <SearchBar />
            </div>
        </div>
      
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                {hasUnreadNotifications && (
                    <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-destructive" />
                )}
                <span className="sr-only">Notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[380px] p-0">
            <Card className="border-0 shadow-none">
                <CardHeader className="pb-4">
                    <CardTitle className="text-base">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {notifications.length > 0 ? (
                    <div className="flex flex-col">
                        {notifications.map((notif, index) => (
                          <div key={notif.id}>
                            <div className={cn("p-4 flex items-start gap-3 hover:bg-secondary/50", !notif.read && "bg-primary/5")}>
                                {!notif.read && <span className="mt-2.5 block h-2 w-2 rounded-full bg-primary" />}
                                <div className={cn("flex-1", notif.read && "pl-5")}>
                                     {notif.type === 'credentials' && (
                                        <div className="flex items-center gap-2">
                                           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10">
                                              <KeyRound className="h-4 w-4 text-yellow-500" />
                                          </div>
                                           <p className="text-sm">
                                              Game credentials for <span className="font-semibold">{notif.tournamentName}</span> have been sent. Check your dashboard.
                                           </p>
                                        </div>
                                    )}
                                    {notif.type === 'new_follower' && (
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={notif.avatar} alt={notif.user} data-ai-hint={notif.avatarHint}/>
                                                <AvatarFallback>{notif.user.substring(0,2)}</AvatarFallback>
                                            </Avatar>
                                            <p className="text-sm">
                                                <span className="font-semibold">{notif.user}</span> started following you.
                                            </p>
                                        </div>
                                    )}
                                     {notif.type === 'comment' && (
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={notif.avatar} alt={notif.user} data-ai-hint={notif.avatarHint}/>
                                                <AvatarFallback>{notif.user.substring(0,2)}</AvatarFallback>
                                            </Avatar>
                                            <p className="text-sm">
                                                <span className="font-semibold">{notif.user}</span> commented on your post about <span className="font-medium text-primary">{notif.post}</span>.
                                            </p>
                                        </div>
                                    )}
                                    {notif.type === 'tournament_reminder' && (
                                        <div className="flex items-center gap-2">
                                           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                              <Users className="h-4 w-4 text-primary" />
                                          </div>
                                           <p className="text-sm">
                                              Reminder: <span className="font-semibold">{notif.game}</span> tournament starts soon.
                                           </p>
                                        </div>
                                    )}
                                    {notif.type === 'group_invite' && (
                                        <div className="flex items-center gap-2">
                                           <Avatar className="h-8 w-8">
                                                <AvatarImage src={notif.avatar} alt={notif.user} data-ai-hint={notif.avatarHint}/>
                                                <AvatarFallback>{notif.user.substring(0,2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                              <p className="text-sm">
                                                  <span className="font-semibold">{notif.user}</span> invited you to join the group <span className="font-medium text-primary">{notif.group}</span>.
                                              </p>
                                              <div className="mt-2 flex gap-2">
                                                <Button size="sm" className="h-7">Accept</Button>
                                                <Button size="sm" variant="outline" className="h-7">Decline</Button>
                                              </div>
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                                </div>
                            </div>
                             {index < notifications.length - 1 && <Separator />}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="p-4 text-center text-sm text-muted-foreground">You have no new notifications.</p>
                  )}
                </CardContent>
            </Card>
          </PopoverContent>
        </Popover>

        <Link href="/dms">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Messages</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
