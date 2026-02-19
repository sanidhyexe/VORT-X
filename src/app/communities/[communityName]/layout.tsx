

'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Hash, Bell, UserPlus, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCommunities } from '@/context/community-context';

const channels = [
  { name: 'general-chat', label: 'General Chat' },
  { name: 'announcements', label: 'Announcements' },
  { name: 'looking-for-group', label: 'Looking for Group' },
  { name: 'strategies', label: 'Strategies' },
  { name: 'off-topic', label: 'Off-Topic' },
];

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const communityName = decodeURIComponent(params.communityName as string);
  const { communities } = useCommunities();
  const community = communities.find(c => c.name === communityName);

  return (
      <div className="grid h-full grid-cols-[240px_1fr] overflow-hidden">
        {/* Channel List */}
        <div className="flex flex-col border-r bg-secondary/50">
          <div className="flex h-14 items-center border-b px-4">
              <h2 className="font-bold text-lg truncate">{communityName}</h2>
          </div>
          <ScrollArea className="flex-1">
             <nav className="grid items-start p-2 text-base font-medium">
                {channels.map((channel) => {
                    const isActive = pathname === `/communities/${params.communityName}/${channel.name}`;
                    return (
                        <Link 
                            key={channel.name} 
                            href={`/communities/${encodeURIComponent(communityName)}/${channel.name}`}
                            className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all duration-150", 
                                isActive ? "bg-primary/20 text-primary" : "hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            <Hash className="h-4 w-4" />
                            <span className="truncate">{channel.label}</span>
                        </Link>
                    )
                })}
             </nav>
          </ScrollArea>
           <div className="mt-auto p-2 border-t">
              <div className="flex items-center gap-2">
                  <Avatar className="h-9 w-9">
                      <AvatarImage src="https://placehold.co/128x128.png" alt="User" data-ai-hint="esports player avatar" />
                      <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">YUV-X</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                  <Button variant="ghost" size="icon">
                      <Cog className="h-4 w-4" />
                  </Button>
              </div>
          </div>
        </div>
        
        {/* Main Content (Chat) */}
        <div className="flex flex-col h-full">{children}</div>
      </div>
  );
}
