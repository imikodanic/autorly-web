"use client";
import { Clock, MoreHorizontal, Edit, Trash2 } from "lucide-react";
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
import { LinkedInPost } from "@/lib/api/linkedin-posts/model";
import { DeletePostDialog } from "./delete-post-dialog";
import { useState } from "react";

interface PostCardProps {
    post: LinkedInPost;
    onEdit?: (postId: string) => void;
    onDelete?: (postId: string) => void;
    hideActions?: boolean;
    user: {
        avatar_url: string;
        display_name: string;
    };
}

export function PostCard({ post, onEdit, onDelete, user, hideActions }: PostCardProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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
        if (post.status === "published" && post.published_at) {
            return `Published ${formatDistanceToNow(post.published_at, { addSuffix: true })}`;
        }
        if (post.status === "scheduled" && post.scheduled_at) {
            return `Scheduled for ${new Date(post.scheduled_at).toLocaleDateString()} at ${new Date(post.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
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

        // Delete action - available for all posts
        actions.push(
            <DropdownMenuItem
                key="delete"
                className="text-red-600"
                onClick={() => setShowDeleteDialog(true)}
            >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
            </DropdownMenuItem>
        );

        return actions;
    };

    return (
        <>
            <Card className="w-full gap-0">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatar_url} />
                                <AvatarFallback>--</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{user.display_name}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {getTimeInfo()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {getStatusBadge()}
                            {!hideActions && (
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
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {post.content}
                    </div>
                </CardContent>
            </Card>
            <DeletePostDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                post={post}
                onConfirm={() => {
                    onDelete?.(post.id);
                    setShowDeleteDialog(false);
                }}
            />
        </>
    );
}
