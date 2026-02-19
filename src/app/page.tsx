
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import heavy components with loading states
const LifetimeStatsCard = dynamic(() => import("@/components/dashboard/lifetime-stats-card"), {
  loading: () => <Skeleton className="h-48 w-full" />,
  ssr: false
});

const PerformanceAnalyticsCard = dynamic(() => import("@/components/dashboard/performance-analytics-card"), {
  loading: () => <Skeleton className="h-64 w-full" />,
  ssr: false
});

const RegisteredTournamentsCard = dynamic(() => import("@/components/dashboard/registered-tournaments-card"), {
  loading: () => <Skeleton className="h-96 w-full" />,
  ssr: false
});

const HostedTournaments = dynamic(() => import("@/components/dashboard/hosted-tournaments"), {
  loading: () => <Skeleton className="h-96 w-full" />,
  ssr: false
});

const RewardPointsCard = dynamic(() => import("@/components/dashboard/reward-points-card"), {
  loading: () => <Skeleton className="h-64 w-full" />,
  ssr: false
});

const UpcomingEventsCard = dynamic(() => import("@/components/dashboard/upcoming-events-card"), {
  loading: () => <Skeleton className="h-64 w-full" />,
  ssr: false
});

const LiveEventsCard = dynamic(() => import("@/components/dashboard/live-events-card"), {
  loading: () => <Skeleton className="h-64 w-full" />,
  ssr: false
});

const TournamentCredentialsCard = dynamic(() => import("@/components/dashboard/tournament-credentials-card"), {
  loading: () => <Skeleton className="h-32 w-full" />,
  ssr: false
});

const LiveTournamentAlert = dynamic(() => import("@/components/dashboard/live-tournament-alert"), {
  loading: () => null,
  ssr: false
});

export default function DashboardPage() {
  return (
      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
           <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, <span className="text-gradient">YUV-X</span>!</h1>
                <p className="text-muted-foreground">Here's a snapshot of your gaming world.</p>
            </div>
          <Suspense fallback={null}>
            <LiveTournamentAlert />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            <TournamentCredentialsCard />
          </Suspense>
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {/* Main Content Area */}
            <div className="lg:col-span-2 xl:col-span-3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                  <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                    <LiveEventsCard />
                  </Suspense>
                  <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                    <RegisteredTournamentsCard />
                  </Suspense>
                </div>
                <div className="xl:col-span-1 space-y-6">
                  <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                    <PerformanceAnalyticsCard />
                  </Suspense>
                </div>
              </div>
              <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <HostedTournaments />
              </Suspense>
            </div>

            {/* Right Sidebar Area */}
            <div className="lg:col-span-1 xl:col-span-1 space-y-6">
              <Suspense fallback={<Skeleton className="h-48 w-full" />}>
                <LifetimeStatsCard />
              </Suspense>
              <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                <RewardPointsCard />
              </Suspense>
              <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                <UpcomingEventsCard />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
  );
}
