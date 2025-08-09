"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/post-card";
import { GeneratePostDialog } from "@/components/generate-post-dialog";
import { SchedulePostDialog } from "@/components/schedule-post-dialog";
import { StatsOverview } from "@/components/stats-overview";
import { useMe } from "@/lib/api/me/hook";
import { LinkedInNotConnectedState } from "@/components/linkedin-not-connected-state";

// Mock data for posts
const mockPosts = [
    {
        id: "1",
        content:
            "🚀 Just launched our new AI-powered analytics dashboard! The future of data visualization is here. What features would you love to see next? #AI #Analytics #Innovation",
        status: "published" as const,
        scheduledFor: new Date("2024-01-15T10:00:00"),
        publishedAt: new Date("2024-01-15T10:00:00"),
        engagement: { likes: 45, comments: 12, shares: 8 },
        imageUrl: "/placeholder.svg?height=300&width=500",
    },
    {
        id: "2",
        content:
            "💡 5 key lessons I learned while building a SaaS from scratch:\n\n1. Customer feedback is gold\n2. MVP doesn't mean minimum effort\n3. Automation saves sanity\n4. Community beats competition\n5. Persistence pays off\n\nWhat would you add to this list?",
        status: "scheduled" as const,
        scheduledFor: new Date("2024-01-20T14:30:00"),
        engagement: { likes: 0, comments: 0, shares: 0 },
    },
    {
        id: "3",
        content:
            "🎯 The secret to consistent LinkedIn growth? It's not about posting more—it's about posting smarter. Here's my framework for creating content that actually converts...",
        status: "draft" as const,
        engagement: { likes: 0, comments: 0, shares: 0 },
    },
    {
        id: "4",
        content:
            "🔥 Hot take: AI won't replace marketers, but marketers using AI will replace those who don't. \n\nThe tools are evolving faster than ever. Are you keeping up? #MarketingAI #FutureOfWork",
        status: "published" as const,
        scheduledFor: new Date("2024-01-12T09:15:00"),
        publishedAt: new Date("2024-01-12T09:15:00"),
        engagement: { likes: 78, comments: 23, shares: 15 },
    },
];

export default function DashboardPage() {
    const [posts, setPosts] = useState(mockPosts);
    const [showGenerateDialog, setShowGenerateDialog] = useState(false);
    const [showScheduleDialog, setShowScheduleDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState<string | null>(null);

    const handleGeneratePost = (content: string, imageUrl?: string) => {
        const newPost = {
            id: Date.now().toString(),
            content,
            status: "draft" as const,
            engagement: { likes: 0, comments: 0, shares: 0 },
            ...(imageUrl && { imageUrl }),
        };
        // @ts-expect-error -- fix later
        setPosts([newPost, ...posts]);
    };

    const handleSchedulePost = (postId: string, scheduledFor: Date) => {
        setPosts(
            // @ts-expect-error -- fix later
            posts.map((post) =>
                post.id === postId ? { ...post, status: "scheduled" as const, scheduledFor } : post
            )
        );
    };

    const publishedPosts = posts.filter((post) => post.status === "published");
    const scheduledPosts = posts.filter((post) => post.status === "scheduled");
    const draftPosts = posts.filter((post) => post.status === "draft");

    const { data: me } = useMe();

    if (!me?.linkedinAccount) {
        return <LinkedInNotConnectedState />;
    }

    return (
        <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Manage your LinkedIn content and track performance
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        onClick={() => setShowGenerateDialog(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Generate Post
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <StatsOverview posts={posts} />

            {/* Main Content */}
            <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Posts ({posts.length})</TabsTrigger>
                    <TabsTrigger value="published">Published ({publishedPosts.length})</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled ({scheduledPosts.length})</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts ({draftPosts.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <div className="grid gap-4">
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onSchedule={(postId) => {
                                    setSelectedPost(postId);
                                    setShowScheduleDialog(true);
                                }}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="published" className="space-y-4">
                    <div className="grid gap-4">
                        {publishedPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="scheduled" className="space-y-4">
                    <div className="grid gap-4">
                        {scheduledPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onSchedule={(postId) => {
                                    setSelectedPost(postId);
                                    setShowScheduleDialog(true);
                                }}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="drafts" className="space-y-4">
                    <div className="grid gap-4">
                        {draftPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onSchedule={(postId) => {
                                    setSelectedPost(postId);
                                    setShowScheduleDialog(true);
                                }}
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Dialogs */}
            <GeneratePostDialog
                open={showGenerateDialog}
                onOpenChange={setShowGenerateDialog}
                onGenerate={handleGeneratePost}
            />

            <SchedulePostDialog
                open={showScheduleDialog}
                onOpenChange={setShowScheduleDialog}
                postId={selectedPost}
                onSchedule={handleSchedulePost}
            />
        </div>
    );
}
