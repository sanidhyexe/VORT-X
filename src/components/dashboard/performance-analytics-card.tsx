
'use client';

import { BarChart, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import DashboardStatsCard from "./dashboard-stats-card";

const chartData = [
  { month: "Jan", rank: 186 },
  { month: "Feb", rank: 205 },
  { month: "Mar", rank: 237 },
  { month: "Apr", rank: 173 },
  { month: "May", rank: 209 },
  { month: "Jun", rank: 214 },
];

const chartConfig = {
  rank: {
    label: "Rank",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function PerformanceAnalyticsCard() {
    return (
        <Card className="shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
            <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Your recent performance trends.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-4 mb-6">
                    <DashboardStatsCard title="Win Rate" value="67.8%" change={2.1} icon={TrendingUp} />
                    <DashboardStatsCard title="KDA Ratio" value="1.82" change={-0.5} icon={BarChart} />
                </div>
                <div>
                    <h3 className="text-base font-semibold mb-2">Rank Progression</h3>
                    <ChartContainer config={chartConfig} className="aspect-auto h-[150px] w-full">
                        <AreaChart data={chartData} margin={{ left: -20, right: 10, top:10, bottom: 0}}>
                            <defs>
                                <linearGradient id="fillRank" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-rank)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-rank)" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="month" 
                                tickLine={false} 
                                axisLine={false} 
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Area dataKey="rank" type="natural" fill="url(#fillRank)" stroke="var(--color-rank)" stackId="a" />
                        </AreaChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}
