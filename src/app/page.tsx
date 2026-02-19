
'use client';

import LifetimeStatsCard from "@/components/dashboard/lifetime-stats-card";
import PerformanceAnalyticsCard from "@/components/dashboard/performance-analytics-card";
import RegisteredTournamentsCard from "@/components/dashboard/registered-tournaments-card";
import HostedTournaments from "@/components/dashboard/hosted-tournaments";
import RewardPointsCard from "@/components/dashboard/reward-points-card";
import UpcomingEventsCard from "@/components/dashboard/upcoming-events-card";
import LiveEventsCard from "@/components/dashboard/live-events-card";
import TournamentCredentialsCard from "@/components/dashboard/tournament-credentials-card";
import { BarChart3, Clock, User } from "lucide-react";
import LiveTournamentAlert from "@/components/dashboard/live-tournament-alert";

export default function DashboardPage() {
  return (
      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
           <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, <span className="text-gradient">YUV-X</span>!</h1>
                <p className="text-muted-foreground">Here's a snapshot of your gaming world.</p>
            </div>
          <LiveTournamentAlert />
          <TournamentCredentialsCard />
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {/* Main Content Area */}
            <div className="lg:col-span-2 xl:col-span-3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                  <LiveEventsCard />
                  <RegisteredTournamentsCard />
                </div>
                <div className="xl:col-span-1 space-y-6">
                  <PerformanceAnalyticsCard />
                </div>
              </div>
              <HostedTournaments />
            </div>

            {/* Right Sidebar Area */}
            <div className="lg:col-span-1 xl:col-span-1 space-y-6">
              <LifetimeStatsCard />
              <RewardPointsCard />
              <UpcomingEventsCard />
            </div>
          </div>
        </div>
      </div>
  );
}
