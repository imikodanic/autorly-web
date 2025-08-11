"use client";
import { Calendar, Clock, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

interface Post {
    id: string;
    content: string;
    status: "published" | "scheduled" | "draft";
    scheduledFor?: Date;
    publishedAt?: Date;
    imageUrl?: string;
}

interface PostCardProps {
    post: Post;
    onEdit?: (postId: string) => void;
    onSchedule?: (postId: string) => void;
    onDelete?: (postId: string) => void;
}

export function PostCard({ post, onEdit, onSchedule, onDelete }: PostCardProps) {
    const getStatusBadge = () => {
        switch (post.status) {
            case "published":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Published
                    </Badge>
                );
            case "scheduled":
                return (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>
                );
            case "draft":
                return <Badge variant="secondary">Draft</Badge>;
        }
    };

    const getTimeInfo = () => {
        if (post.status === "published" && post.publishedAt) {
            return `Published ${formatDistanceToNow(post.publishedAt, { addSuffix: true })}`;
        }
        if (post.status === "scheduled" && post.scheduledFor) {
            return `Scheduled for ${post.scheduledFor.toLocaleDateString()} at ${post.scheduledFor.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
        }
        return "Draft";
    };

    const getAvailableActions = () => {
        const actions = [];

        // Edit action - available for scheduled and draft posts
        if (post.status === "scheduled" || post.status === "draft") {
            actions.push(
                <DropdownMenuItem key="edit" onClick={() => onEdit?.(post.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
            );
        }

        // Schedule/Reschedule action
        if (post.status === "draft") {
            actions.push(
                <DropdownMenuItem key="schedule" onClick={() => onSchedule?.(post.id)}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                </DropdownMenuItem>
            );
        } else if (post.status === "scheduled") {
            actions.push(
                <DropdownMenuItem key="reschedule" onClick={() => onSchedule?.(post.id)}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Reschedule
                </DropdownMenuItem>
            );
        }

        // Delete action - available for all posts
        actions.push(
            <DropdownMenuItem
                key="delete"
                className="text-red-600"
                onClick={() => onDelete?.(post.id)}
            >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
            </DropdownMenuItem>
        );

        return actions;
    };

    return (
        <Card className="w-full">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>YN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Your Name</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {getTimeInfo()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {getStatusBadge()}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {getAvailableActions()}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{post.content}</div>
            </CardContent>
        </Card>
    );
}
