
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Toaster } from "@/components/ui/toaster"
import SplashScreen from '@/components/layout/splash-screen';
import './globals.css';
import { FeedProvider } from '@/context/feed-context';
import { ThemeProvider, useTheme } from '@/context/theme-context';
import { TournamentProvider } from '@/context/tournament-context';
import { CommunityProvider } from '@/context/community-context';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import BottomNav from '@/components/layout/bottom-nav';
import AppHeader from '@/components/layout/app-header';

// Lazy load particle background for better initial load
const ParticleBackground = dynamic(() => import('@/components/particle-background'), {
  ssr: false,
  loading: () => null
});

function AppContent({ children }: { children: React.ReactNode }) {
  const [loadingSplash, setLoadingSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const isLandingPage = pathname === '/landing';
  const isDmPage = pathname.startsWith('/dms');
  
  // Memoize calculated values
  const { showHeader, showBottomNav } = useMemo(() => ({
    showHeader: !isLandingPage && !isDmPage,
    showBottomNav: !isLandingPage && !isDmPage,
  }), [isLandingPage, isDmPage]);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setLoadingSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || loadingSplash) {
    return <SplashScreen />;
  }

  return (
    <TooltipProvider delayDuration={0}>
        <div className='h-screen overflow-hidden bg-background'>
          <ParticleBackground />
          <div className={cn("flex flex-col h-full", isDmPage && "h-full")}>
              {showHeader && <AppHeader />}
              <main className={cn("flex-1 overflow-auto", showBottomNav && "pb-20")}>
                {children}
              </main>
              {showBottomNav && <BottomNav />}
          </div>
          <Toaster />
        </div>
    </TooltipProvider>
  );
}

function AppContentWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return <AppContent>{children}</AppContent>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>VORT-X</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-screen overflow-hidden">
        <ThemeProvider>
          <CommunityProvider>
            <TournamentProvider>
              <FeedProvider>
                  <AppContentWrapper>{children}</AppContentWrapper>
              </FeedProvider>
            </TournamentProvider>
          </CommunityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
