
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Gamepad2, Newspaper, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useState, useEffect, useRef } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/social', label: 'Social', icon: Newspaper },
  { href: '/communities', label: 'Communities', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const isDmPage = pathname.startsWith('/dms');

  useEffect(() => {
    // Hide-on-scroll is disabled for DM pages
    if (isDmPage) {
        setIsVisible(true);
        return;
    };

    const mainScrollable = document.querySelector('main');
    if (!mainScrollable) return;

    const controlNavbar = () => {
      if (mainScrollable.scrollTop > lastScrollY.current && mainScrollable.scrollTop > 50) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY.current = mainScrollable.scrollTop;
    };
    
    mainScrollable.addEventListener('scroll', controlNavbar);
    return () => {
      mainScrollable.removeEventListener('scroll', controlNavbar);
    };
  }, [isDmPage]);


  return (
    <div className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-24"
    )}>
        <div className="flex items-center justify-around gap-2 rounded-full border bg-background/80 p-2 shadow-lg backdrop-blur-md">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <TooltipProvider key={item.href}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={item.href}>
                                    <div className={cn(
                                        "flex flex-col items-center justify-center h-14 w-14 rounded-full text-muted-foreground transition-colors duration-200 hover:bg-primary/10",
                                        isActive && "bottom-nav-active"
                                    )}>
                                        <item.icon className="h-6 w-6" />
                                        <span className="text-xs font-medium sr-only">{item.label}</span>
                                    </div>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{item.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            })}
        </div>
    </div>
  );
}
