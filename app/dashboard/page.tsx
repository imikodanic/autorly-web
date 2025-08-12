"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/post-card";
import { GeneratePostDialog } from "@/components/generate-post-dialog";
import { StatsOverview } from "@/components/stats-overview";
import { LinkedInNotConnectedState } from "@/components/linkedin-not-connected-state";
import { useMe } from "@/lib/api/me/hook";
import {
    useCreateLinkedInPost,
    useDeleteLinkedInPost,
    useLinkedInPosts,
    useUpdateLinkedInPost,
} from "@/lib/api/linkedin-posts/hook";
import { LinkedInPost } from "@/lib/api/linkedin-posts/model";

export default function DashboardPage() {
    const { data: me } = useMe();

    const getPosts = useLinkedInPosts();
    const createPostMutation = useCreateLinkedInPost();
    const updatePostMutation = useUpdateLinkedInPost();
    const deletePostMutation = useDeleteLinkedInPost();

    const posts: LinkedInPost[] = getPosts.data ?? [];

    const [showGenerateDialog, setShowGenerateDialog] = useState(false);
    const [editingPost, setEditingPost] = useState<string | null>(null);

    async function postToLinkedin(content: string) {
        const response = await fetch("/api/linkedin/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: content,
            }),
        });

        if (!response.ok) {
            console.error("Failed to post to LinkedIn:", response.statusText);
        }

        return response;
    }

    const handlePublishPost = async (content: string) => {
        const publishedPost = await postToLinkedin(content);

        console.log(await publishedPost.json());

        if (editingPost) {
            updatePostMutation.mutate({
                id: editingPost,
                content,
                status: "published",
            });

            setEditingPost(null);
        } else {
            createPostMutation.mutate({
                content,
                status: "published",
            });
        }
    };

    const handleSchedulePostFromDialog = (content: string, scheduled_at_date: Date) => {
        if (editingPost) {
            updatePostMutation.mutate({
                id: editingPost,
                content,
                status: "scheduled",
                scheduled_at: scheduled_at_date.toISOString(),
            });

            setEditingPost(null);
        } else {
            createPostMutation.mutate({
                content,
                status: "scheduled",
                scheduled_at: scheduled_at_date.toISOString(),
            });
        }
    };

    const handleSaveDraft = (content: string) => {
        if (editingPost) {
            updatePostMutation.mutate({ id: editingPost, content, status: "draft" });
            setEditingPost(null);
        } else {
            createPostMutation.mutate({ content, status: "draft" });
        }
    };

    const handleSavePost = (content: string) => {
        if (!editingPost) return;

        updatePostMutation.mutate({ id: editingPost, content });
    };

    const handleEditPost = (postId: string) => {
        setEditingPost(postId);
        setShowGenerateDialog(true);
    };

    const handleDeletePost = (postId: string) => {
        deletePostMutation.mutate(postId);
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
                                user={me.linkedinAccount}
                                onEdit={handleEditPost}
                                onDelete={handleDeletePost}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="published" className="space-y-4">
                    <div className="grid gap-4">
                        {publishedPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                user={me.linkedinAccount}
                                onDelete={handleDeletePost}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="scheduled" className="space-y-4">
                    <div className="grid gap-4">
                        {scheduledPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                user={me.linkedinAccount}
                                onEdit={handleEditPost}
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
                                user={me.linkedinAccount}
                                onEdit={handleEditPost}
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
        </div>
    );
}
