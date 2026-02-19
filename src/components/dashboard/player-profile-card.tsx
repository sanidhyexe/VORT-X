
'use client';

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageSquare, Plus, Star, Trophy, Camera, Pencil, X, Save, Calendar, Edit } from "lucide-react";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ValorantIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.47 1.46L3.19 8.21l5.43 2.87 2.14 5.9 8.52-10.3-5.22-5.22zM2.08 9.53l11.45-6.04 4.39 4.39-7.9 9.6-3.05-8.42-4.89-2.53z"/>
    </svg>
)

const CSIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.94 13.5l-3.3 2.04c-.3.19-.68.13-.9-.15-.22-.28-.24-.68-.05-.98l1.4-3.5-2.9-2.22c-.32-.24-.4-.7-.2-1.05.2-.35.58-.53.95-.45l3.6.3 1.3-3.4c.16-.4.58-.64.98-.55.4.09.68.45.62.85l-.7 3.5 3.1 2.4c.32.25.4.7-.2 1.05-.2.35-.58.53-.95-.45l-3.6-.3-1.05 3.55z"/>
    </svg>
)

const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function PlayerProfileCard() {
    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState(false);
    
    const [username, setUsername] = useState("YUV-X");
    const [bio, setBio] = useState("Pro Valorant player for Team Sentinel. I stream, compete, and love connecting with the community. Let's rank up together!");
    const [bannerImage, setBannerImage] = useState("https://placehold.co/1200x300.png");
    const [avatarImage, setAvatarImage] = useState("https://placehold.co/128x128.png");
    
    const [usernameDraft, setUsernameDraft] = useState(username);
    const [bioDraft, setBioDraft] = useState(bio);
    const [bannerDraft, setBannerDraft] = useState(bannerImage);
    const [avatarDraft, setAvatarDraft] = useState(avatarImage);

    const bannerInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
        toast({
            title: !isFollowing ? `Followed ${username}!` : `Unfollowed ${username}`,
            description: !isFollowing ? "You'll now see their updates on your feed." : "You've unfollowed this user.",
        });
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'avatar') => {
        const file = event.target.files?.[0];
        if (file) {
            const dataUri = await fileToDataUri(file);
            if (type === 'banner') {
                setBannerDraft(dataUri);
            } else {
                setAvatarDraft(dataUri);
            }
        }
    }

    const handleSave = () => {
        if(usernameDraft.trim().length < 3) {
            toast({ title: "Username must be at least 3 characters.", variant: "destructive" });
            return;
        }
        setUsername(usernameDraft);
        setBio(bioDraft);
        setBannerImage(bannerDraft);
        setAvatarImage(avatarDraft);
        setIsEditing(false);
        toast({ title: "Profile updated successfully!" });
    }

    const handleCancel = () => {
        setUsernameDraft(username);
        setBioDraft(bio);
        setBannerDraft(bannerImage);
        setAvatarDraft(avatarImage);
        setIsEditing(false);
    }
    
    return (
        <div className="max-w-7xl mx-auto">
            <Card className="profile-card overflow-hidden shadow-lg border-primary/20 bg-card/80 backdrop-blur-sm">
                <div className="relative group">
                    <input 
                        type="file" 
                        ref={bannerInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => handleFileChange(e, 'banner')}
                    />
                    <Image 
                        src={isEditing ? bannerDraft : bannerImage}
                        alt="Profile banner" 
                        width={1200}
                        height={300}
                        className="w-full h-48 sm:h-64 object-cover"
                        data-ai-hint="futuristic gaming banner"
                    />
                    {isEditing && (
                         <Button size="icon" variant="outline" className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm" onClick={() => bannerInputRef.current?.click()}>
                            <Camera className="h-4 w-4"/>
                            <span className="sr-only">Change Banner Image</span>
                        </Button>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-end gap-4">
                        <div className="relative group">
                            <input 
                                type="file" 
                                ref={avatarInputRef} 
                                className="hidden" 
                                accept="image/*" 
                                onChange={(e) => handleFileChange(e, 'avatar')}
                            />
                            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-background shadow-lg relative">
                                <AvatarImage src={isEditing ? avatarDraft : avatarImage} alt="Player Avatar" data-ai-hint="esports player avatar"/>
                                <AvatarFallback>PRO</AvatarFallback>
                            </Avatar>
                             {isEditing && (
                                <Button size="icon" variant="outline" className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm" onClick={() => avatarInputRef.current?.click()}>
                                    <Camera className="h-4 w-4"/>
                                    <span className="sr-only">Change Profile Picture</span>
                                </Button>
                            )}
                        </div>
                        <div className="flex-1 text-center sm:text-left min-w-0">
                             <div className="flex items-center justify-center sm:justify-start gap-2 group">
                                {isEditing ? (
                                    <Input 
                                        value={usernameDraft}
                                        onChange={(e) => setUsernameDraft(e.target.value)}
                                        className="h-9 text-2xl sm:text-3xl font-bold font-headline"
                                        maxLength={20}
                                    />
                                ) : (
                                    <h1 className="text-2xl sm:text-3xl font-bold font-headline break-words">{username}</h1>
                                )}
                                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">Online</Badge>
                            </div>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                                <Badge variant="outline" className="border-yellow-400/50"><Trophy className="h-3 w-3 mr-1 text-yellow-400"/> VCT 2023 Champion</Badge>
                                <Badge variant="outline" className="border-purple-400/50"><Star className="h-3 w-3 mr-1 text-purple-400"/> MVP</Badge>
                            </div>
                            <div className="mt-2 relative group">
                                {isEditing ? (
                                    <Textarea 
                                        value={bioDraft} 
                                        onChange={(e) => setBioDraft(e.target.value)} 
                                        className="text-sm text-muted-foreground max-w-lg mx-auto sm:mx-0"
                                        maxLength={150}
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground max-w-lg mx-auto sm:mx-0 break-words">{bio}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2 sm:mt-0 flex-col sm:flex-row w-full sm:w-auto">
                           {isEditing ? (
                                <>
                                    <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
                                    <Button onClick={handleSave}><Save className="mr-2 h-4 w-4"/>Save</Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
                                        <Edit className="mr-2 h-4 w-4"/>Edit Profile
                                    </Button>
                                </>
                           )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
