
'use client';

import Link from 'next/link';
import { useCommunities } from '@/context/community-context';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function CommunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { communities } = useCommunities();
  const params = useParams();
  const communityName = params.communityName ? decodeURIComponent(params.communityName as string) : null;

  return (
    <div className="grid h-full grid-cols-[72px_1fr] overflow-hidden">
      {/* Server List */}
      <TooltipProvider>
        <div className="flex flex-col items-center gap-2 border-r bg-background py-2">
            <Link href="/" className='mb-2'>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground">
                    V
                </div>
            </Link>
          {communities.map((community) => (
            <Tooltip key={community.id}>
              <TooltipTrigger asChild>
                <Link href={`/communities/${encodeURIComponent(community.name)}`}>
                  <div className={cn(
                    "relative h-12 w-12 overflow-hidden rounded-full transition-all duration-200",
                    communityName === community.name ? "rounded-2xl" : "hover:rounded-2xl"
                  )}>
                    <Image
                      src={community.image}
                      alt={community.name}
                      fill
                      className="object-cover"
                      data-ai-hint={community.imageHint}
                    />
                    <div className={cn(
                        "absolute left-[-4px] top-1/2 h-0 w-1 -translate-y-1/2 rounded-r-full bg-foreground transition-all duration-200",
                        communityName === community.name && "h-10"
                    )}/>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{community.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
             <TooltipTrigger asChild>
                <Link href="/communities">
                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-colors duration-200 hover:bg-green-500 hover:text-white">
                        <Plus className="h-6 w-6" />
                    </button>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>Create or Join</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      {/* Channel List & Content */}
      <div className="h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
