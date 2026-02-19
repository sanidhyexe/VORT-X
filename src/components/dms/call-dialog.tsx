
'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
import { User } from "./mock-data";
import { useState, useEffect, useRef } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CallDialogProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    callType: 'voice' | 'video';
}

export default function CallDialog({ isOpen, onClose, user, callType }: CallDialogProps) {
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(callType === 'voice');
    
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);

    useEffect(() => {
        if (!isOpen || callType !== 'video') return;

        let stream: MediaStream | null = null;
        
        const getCameraPermission = async () => {
          try {
            stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            setHasCameraPermission(true);
    
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to use this feature.',
            });
          }
        };
    
        getCameraPermission();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        }
      }, [isOpen, callType, toast]);

    const VideoCallUI = () => (
        <div className="relative w-full h-full text-white">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover -z-10" autoPlay muted />
            <div className="absolute inset-0 bg-black/40" />

            {!hasCameraPermission && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <Alert variant="destructive" className="max-w-sm">
                      <AlertTitle>Camera Access Required</AlertTitle>
                      <AlertDescription>
                        Please allow camera access in your browser to use this feature.
                      </AlertDescription>
                    </Alert>
                </div>
            )}
            
            <div className="relative z-10 flex flex-col h-full p-6">
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                     <Avatar className="h-24 w-24 mb-4 ring-2 ring-white/50">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-3xl font-bold">Video Call with {user.name}</h2>
                    <p className="text-lg opacity-80">Ringing...</p>
                </div>
                
                <div className="flex justify-center items-center gap-6">
                    <Button variant="outline" size="icon" className="h-16 w-16 rounded-full bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30" onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
                    </Button>
                    <Button variant="destructive" size="icon" className="h-16 w-16 rounded-full" onClick={onClose}>
                        <PhoneOff className="h-7 w-7" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-16 w-16 rounded-full bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30" onClick={() => setIsCameraOff(!isCameraOff)}>
                        {isCameraOff ? <VideoOff className="h-7 w-7" /> : <Video className="h-7 w-7" />}
                    </Button>
                </div>
            </div>
        </div>
    );
    
    const VoiceCallUI = () => (
         <DialogContent className="sm:max-w-md">
            <DialogHeader className="items-center text-center">
                 <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <DialogTitle className="text-2xl">
                    Calling {user.name}
                </DialogTitle>
                <DialogDescription>
                    Ringing...
                </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex-row justify-center gap-4 pt-8">
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-full" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </Button>
                <Button variant="destructive" size="icon" className="h-14 w-14 rounded-full" onClick={onClose}>
                    <PhoneOff className="h-6 w-6" />
                </Button>
            </DialogFooter>
        </DialogContent>
    );

    if (callType === 'video') {
         return (
             <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="p-0 border-0 m-0 w-screen h-screen max-w-full sm:max-w-full sm:h-screen rounded-none">
                    <VideoCallUI />
                </DialogContent>
            </Dialog>
         );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <VoiceCallUI />
        </Dialog>
    );
}
