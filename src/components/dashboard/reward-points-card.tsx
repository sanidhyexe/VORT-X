
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles, Ticket } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function RewardPointsCard() {
    const points = 2480;
    const nextTier = 5000;
    const progress = (points / nextTier) * 100;

    return (
        <Card className="shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Gift className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-lg">Reward Points</CardTitle>
                </div>
                <CardDescription>Earn points for playing and redeem cool rewards.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center bg-secondary/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Your Balance</p>
                    <div className="flex items-center justify-center gap-2">
                        <Sparkles className="h-6 w-6 text-yellow-400" />
                        <p className="text-3xl font-bold">{points.toLocaleString()}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Next Reward Tier</span>
                        <span>{nextTier.toLocaleString()} pts</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </CardContent>
            <CardFooter>
                 <Button className="w-full">
                    <Ticket className="mr-2 h-4 w-4" />
                    Redeem Rewards
                </Button>
            </CardFooter>
        </Card>
    )
}
