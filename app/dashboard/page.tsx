"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/post-card";
import { GeneratePostDialog } from "@/components/generate-post-dialog";
import { SchedulePostDialog } from "@/components/schedule-post-dialog";
import { StatsOverview } from "@/components/stats-overview";
import { LinkedInNotConnectedState } from "@/components/linkedin-not-connected-state";
import { useMe } from "@/lib/api/me/hook";

const mockPosts = [
    {
        id: "1",
        content:
            "🚀 Just launched our new AI-powered analytics dashboard! The future of data visualization is here. What features would you love to see next? #AI #Analytics #Innovation",
        status: "published" as const,
        scheduledFor: new Date("2024-01-15T10:00:00"),
        publishedAt: new Date("2024-01-15T10:00:00"),
        imageUrl: "/placeholder.svg?height=300&width=500",
    },
    {
        id: "2",
        content:
            "💡 5 key lessons I learned while building a SaaS from scratch:\n\n1. Customer feedback is gold\n2. MVP doesn't mean minimum effort\n3. Automation saves sanity\n4. Community beats competition\n5. Persistence pays off\n\nWhat would you add to this list?",
        status: "scheduled" as const,
        scheduledFor: new Date("2024-01-20T14:30:00"),
    },
    {
        id: "3",
        content:
            "🎯 The secret to consistent LinkedIn growth? It's not about posting more—it's about posting smarter. Here's my framework for creating content that actually converts...",
        status: "draft" as const,
    },
    {
        id: "4",
        content:
            "🔥 Hot take: AI won't replace marketers, but marketers using AI will replace those who don't. \n\nThe tools are evolving faster than ever. Are you keeping up? #MarketingAI #FutureOfWork",
        status: "published" as const,
        scheduledFor: new Date("2024-01-12T09:15:00"),
        publishedAt: new Date("2024-01-12T09:15:00"),
    },
];

export default function DashboardPage() {
    const { data: me } = useMe();

    const [posts, setPosts] = useState(mockPosts);
    const [showGenerateDialog, setShowGenerateDialog] = useState(false);
    const [showScheduleDialog, setShowScheduleDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState<string | null>(null);
    const [editingPost, setEditingPost] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handlePublishPost = (content: string) => {
        if (editingPost) {
            console.log("publish post");

            setEditingPost(null);
        } else {
            console.log("publish new post");
        }
    };

    const handleSchedulePostFromDialog = (content: string, scheduledFor: Date) => {
        if (editingPost) {
            console.log("schedule post");
            setEditingPost(null);
        } else {
            // Create new post
            const newPost = {
                id: Date.now().toString(),
                content,
                status: "scheduled" as const,
                scheduledFor,
            };
            setPosts([newPost, ...posts]);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSaveDraft = (content: string) => {
        if (editingPost) {
            console.log("save draft post");

            setEditingPost(null);
        } else {
            console.log("create new draft");
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSavePost = (content: string) => {
        console.log("save post");
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSchedulePost = (postId: string, scheduledFor: Date) => {
        console.log("schedule post");
    };

    const handleEditPost = (postId: string) => {
        console.log("wtf");
        setEditingPost(postId);
        setShowGenerateDialog(true);
    };

    const handleDeletePost = (postId: string) => {
        setPosts(posts.filter((post) => post.id !== postId));
    };

    const getEditingPostContent = () => {
        if (editingPost) {
            const post = posts.find((p) => p.id === editingPost);
            return post?.content || "";
        }
        return "";
    };

    const getEditingPostStatus = () => {
        if (editingPost) {
            const post = posts.find((p) => p.id === editingPost);
            return post?.status;
        }
        return undefined;
    };

    const publishedPosts = posts.filter((post) => post.status === "published");
    const scheduledPosts = posts.filter((post) => post.status === "scheduled");
    const draftPosts = posts.filter((post) => post.status === "draft");

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
                                onEdit={handleEditPost}
                                onSchedule={(postId) => {
                                    setSelectedPost(postId);
                                    setShowScheduleDialog(true);
                                }}
                                onDelete={handleDeletePost}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="published" className="space-y-4">
                    <div className="grid gap-4">
                        {publishedPosts.map((post) => (
                            <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="scheduled" className="space-y-4">
                    <div className="grid gap-4">
                        {scheduledPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onEdit={handleEditPost}
                                onSchedule={(postId) => {
                                    setSelectedPost(postId);
                                    setShowScheduleDialog(true);
                                }}
                                onDelete={handleDeletePost}
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
                                onEdit={handleEditPost}
                                onSchedule={(postId) => {
                                    setSelectedPost(postId);
                                    setShowScheduleDialog(true);
                                }}
                                onDelete={handleDeletePost}
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            <GeneratePostDialog
                open={showGenerateDialog}
                onOpenChange={(open) => {
                    setShowGenerateDialog(open);
                    if (!open) setEditingPost(null);
                }}
                onPublish={handlePublishPost}
                onSchedule={handleSchedulePostFromDialog}
                onSaveDraft={handleSaveDraft}
                onSave={handleSavePost}
                initialContent={getEditingPostContent()}
                isEditMode={!!editingPost}
                postStatus={getEditingPostStatus()}
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
