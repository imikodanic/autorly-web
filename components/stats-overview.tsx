"use client";

import { TrendingUp, Calendar, FileText, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Post {
    id: string;
    content: string;
    status: "published" | "scheduled" | "draft";
    engagement: {
        likes: number;
        comments: number;
        shares: number;
    };
}

interface StatsOverviewProps {
    posts: Post[];
}

export function StatsOverview({ posts }: StatsOverviewProps) {
    const publishedPosts = posts.filter((post) => post.status === "published");
    const scheduledPosts = posts.filter((post) => post.status === "scheduled");
    // const totalEngagement = publishedPosts.reduce(
    //     (total, post) =>
    //         total + post.engagement.likes + post.engagement.comments + post.engagement.shares,
    //     0
    // );
    // const avgEngagement =
    //     publishedPosts.length > 0 ? Math.round(totalEngagement / publishedPosts.length) : 0;

    const stats = [
        {
            title: "Total Posts",
            value: posts.length.toString(),
            description: "All time posts created",
            icon: FileText,
            trend: "+12% from last month",
        },
        {
            title: "Published",
            value: publishedPosts.length.toString(),
            description: "Posts currently live",
            icon: Eye,
            trend: "+8% from last month",
        },
        {
            title: "Scheduled",
            value: scheduledPosts.length.toString(),
            description: "Posts ready to publish",
            icon: Calendar,
            trend: "Ready for this week",
        },
        {
            title: "Avg. Engagement",
            value: "---",
            description: "Per published post",
            icon: TrendingUp,
            trend: "Coming Soon",
            comingSoon: true,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title} className={stat.comingSoon ? "opacity-75 bg-muted/30" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon
                            className={`h-4 w-4 ${stat.comingSoon ? "text-muted-foreground/50" : "text-muted-foreground"}`}
                        />
                    </CardHeader>
                    <CardContent>
                        <div
                            className={`text-2xl font-bold ${stat.comingSoon ? "text-muted-foreground" : ""}`}
                        >
                            {stat.value}
                        </div>
                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                        <p
                            className={`text-xs mt-1 ${stat.comingSoon ? "text-orange-600 font-medium" : "text-green-600"}`}
                        >
                            {stat.trend}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
