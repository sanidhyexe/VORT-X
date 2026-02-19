
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, Users, Gamepad2, Settings, LayoutDashboard, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

const VortXLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      className="h-8 w-auto"
      fill="currentColor"
    >
        <defs>
            <linearGradient id="sidebar-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="stop-color-primary" />
                <stop offset="100%" className="stop-color-accent" />
            </linearGradient>
            <style>{`
                .stop-color-primary { stop-color: hsl(var(--primary)); }
                .stop-color-accent { stop-color: hsl(var(--accent)); }
            `}</style>
        </defs>
        <text x="10" y="40" fontFamily="'Space Grotesk', sans-serif" fontSize="40" fontWeight="bold" fill="url(#sidebar-grad)">
            VORT-X
        </text>
    </svg>
);

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/social', label: 'Social', icon: Newspaper },
  { href: '/communities', label: 'Communities', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function AppSidebar({ isSheet = false }: { isSheet?: boolean }) {
  const pathname = usePathname();

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = pathname === item.href;
    return (
        <Link
            href={item.href}
            className={cn(
                'flex items-center gap-4 rounded-lg px-3 py-3 text-muted-foreground transition-all duration-150',
                 isActive
                  ? 'bg-[hsl(var(--sidebar-active))] text-[hsl(var(--sidebar-active-foreground))]'
                  : 'hover:bg-muted',
            )}
            >
            <item.icon className="h-5 w-5 shrink-0" />
            <span className="truncate transition-all duration-200">
            {item.label}
            </span>
        </Link>
    );
  }

  return (
    <div className={cn("flex h-full max-h-screen flex-col gap-2 overflow-hidden", isSheet ? 'bg-background' : 'bg-muted/40')}>
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <VortXLogo />
            </Link>
        </div>
        <div className="flex-1">
            <ScrollArea className="h-full">
                <nav className="grid items-start p-2 text-base font-medium lg:px-4">
                    {navItems.map((item) => (
                        <NavLink key={item.href} item={item} />
                    ))}
                </nav>
            </ScrollArea>
        </div>
    </div>
  );
}
