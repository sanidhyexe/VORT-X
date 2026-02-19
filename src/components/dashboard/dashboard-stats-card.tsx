
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface DashboardStatsCardProps {
    title: string;
    value: string;
    change?: number;
    icon: React.ElementType;
}

export default function DashboardStatsCard({ title, value, change, icon: Icon }: DashboardStatsCardProps) {
    const isPositive = change !== undefined && change >= 0;

    return (
        <Card className="shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change !== undefined && (
                    <p className={cn(
                        "text-xs text-muted-foreground flex items-center",
                        isPositive ? "text-green-400" : "text-red-400"
                    )}>
                        {isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                        {isPositive ? '+' : ''}{change.toFixed(1)}% vs last month
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
