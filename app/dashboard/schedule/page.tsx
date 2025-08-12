"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Filter, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarView } from "@/components/calendar-view";
import { ScheduledPostCard } from "@/components/scheduled-post-card";
import { SchedulePostDialog } from "@/components/schedule-post-dialog";
import { format, addDays, startOfWeek, endOfWeek } from "date-fns";
import { useLinkedInPosts } from "@/lib/api/linkedin-posts/hook";
import { LinkedInPost } from "@/lib/api/linkedin-posts/model";

export default function SchedulePage() {
    const getPosts = useLinkedInPosts();
    const posts: LinkedInPost[] = getPosts.data ?? [];

    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<"month" | "week" | "list">("month");
    const [selectedPosts, setSelectedPosts] = useState(posts);
    const [showScheduleDialog, setShowScheduleDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState<string | null>(null);

    const handlePreviousPeriod = () => {
        if (viewMode === "month") {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        } else if (viewMode === "week") {
            setCurrentDate(addDays(currentDate, -7));
        }
    };

    const handleNextPeriod = () => {
        if (viewMode === "month") {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        } else if (viewMode === "week") {
            setCurrentDate(addDays(currentDate, 7));
        }
    };

    const handleSchedulePost = (postId: string, scheduledFor: Date) => {
        setSelectedPosts((posts) =>
            posts.map((post) =>
                post.id === postId ? { ...post, scheduledFor, status: "scheduled" as const } : post
            )
        );
    };

    const handlePreviewPost = (postId: string) => {
        setSelectedPost(postId);
    };

    const handleEditPost = (postId: string) => {
        setSelectedPost(postId);
        setShowScheduleDialog(true);
    };

    const handleDeletePost = (postId: string) => {
        if (confirm("Are you sure you want to delete this scheduled post?")) {
            setSelectedPosts((posts) => posts.filter((post) => post.id !== postId));
        }
    };

    const getDateRangeText = () => {
        if (viewMode === "month") {
            return format(currentDate, "MMMM yyyy");
        } else if (viewMode === "week") {
            const start = startOfWeek(currentDate);
            const end = endOfWeek(currentDate);
            return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
        }
        return "";
    };

    return (
        <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Content Schedule</h1>
                    <p className="text-muted-foreground">
                        Manage and view your scheduled LinkedIn posts
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="bg-transparent">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    {/* <Button
                        onClick={() => setShowGenerateDialog(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule Post
                    </Button> */}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Scheduled Today</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">Posts ready to publish</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Week</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Posts scheduled</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next 30 Days</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Posts planned</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Publishing Rate</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.2</div>
                        <p className="text-xs text-muted-foreground">Posts per week</p>
                    </CardContent>
                </Card>
            </div>

            {/* View Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePreviousPeriod}
                            className="bg-transparent"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <h2 className="text-xl font-semibold min-w-[200px] text-center">
                            {getDateRangeText()}
                        </h2>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNextPeriod}
                            className="bg-transparent"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentDate(new Date())}
                        className="bg-transparent"
                    >
                        Today
                    </Button>
                </div>

                <Tabs
                    value={viewMode}
                    onValueChange={(value) => setViewMode(value as "month" | "week" | "list")}
                >
                    <TabsList>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="list">List</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Main Content */}
            <Tabs
                value={viewMode}
                onValueChange={(value) => setViewMode(value as "month" | "week" | "list")}
            >
                <div className="space-y-6">
                    <TabsContent value="month" className="mt-0">
                        <CalendarView
                            currentDate={currentDate}
                            posts={selectedPosts}
                            onPreviewPost={handlePreviewPost}
                            onEditPost={handleEditPost}
                            onDeletePost={handleDeletePost}
                        />
                    </TabsContent>

                    <TabsContent value="week" className="mt-0">
                        <CalendarView
                            currentDate={currentDate}
                            posts={selectedPosts}
                            viewMode="week"
                            onPreviewPost={handlePreviewPost}
                            onEditPost={handleEditPost}
                            onDeletePost={handleDeletePost}
                        />
                    </TabsContent>

                    <TabsContent value="list" className="mt-0">
                        <div className="space-y-4">
                            {selectedPosts
                                .sort(
                                    (a, b) =>
                                        new Date(a.scheduled_at ?? "").getTime() -
                                        new Date(b.scheduled_at ?? "").getTime()
                                )
                                .map((post) => (
                                    <ScheduledPostCard
                                        key={post.id}
                                        post={post}
                                        onPreview={() => handlePreviewPost(post.id)}
                                        onEdit={() => handleEditPost(post.id)}
                                        onDelete={() => handleDeletePost(post.id)}
                                    />
                                ))}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>

            <SchedulePostDialog
                open={showScheduleDialog}
                onOpenChange={setShowScheduleDialog}
                postId={selectedPost}
                onSchedule={handleSchedulePost}
            />
        </div>
    );
}
