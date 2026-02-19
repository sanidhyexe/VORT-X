
import { Award, Gamepad2, Shield, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const stats = [
    { title: "Tournaments Won", value: "24", icon: Trophy, color: "text-yellow-400" },
    { title: "Tournaments Played", value: "89", icon: Gamepad2, color: "text-green-400" },
    { title: "Top 3 Placements", value: "42", icon: Award, color: "text-primary" },
    { title: "Events Attended", value: "12", icon: Shield, color: "text-blue-400" },
]

export default function LifetimeStatsCard() {
    return (
        <Card className="shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
            <CardHeader>
                <CardTitle>Lifetime Stats</CardTitle>
                <CardDescription>Your all-time competitive summary.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {stats.map(stat => (
                    <div key={stat.title} className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary flex-shrink-0 mr-4">
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{stat.title}</p>
                        </div>
                        <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
