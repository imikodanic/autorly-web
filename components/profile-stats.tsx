"use client";

import { TrendingUp, Users, Eye, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProfileStats() {
    const stats = [
        {
            title: "Profile Views",
            value: "---",
            change: "Coming Soon",
            icon: Eye,
            color: "text-blue-600",
        },
        {
            title: "Connections",
            value: "---",
            change: "Coming Soon",
            icon: Users,
            color: "text-green-600",
        },
        {
            title: "Post Impressions",
            value: "---",
            change: "Coming Soon",
            icon: TrendingUp,
            color: "text-purple-600",
        },
        {
            title: "Engagement Rate",
            value: "---",
            change: "Coming Soon",
            icon: Heart,
            color: "text-red-600",
        },
    ];

    return (
        <Card className="opacity-75 bg-muted/30">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>LinkedIn Performance</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                        Coming Soon
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {stats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <stat.icon className={`h-4 w-4 ${stat.color} opacity-50`} />
                                <span className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </span>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-muted-foreground">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-orange-600 font-medium">
                                    {stat.change}
                                </div>
                            </div>
                        </div>
                        <Progress value={0} className="h-2 opacity-50" />
                    </div>
                ))}

                <div className="pt-4 border-t">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-muted-foreground">---%</div>
                        <div className="text-sm text-muted-foreground">Profile Completeness</div>
                        <div className="text-xs text-orange-600 font-medium mt-1">
                            Analytics Coming Soon
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
