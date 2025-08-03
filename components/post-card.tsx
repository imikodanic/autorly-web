"use client";
import {
    Calendar,
    Clock,
    Heart,
    MessageCircle,
    Share2,
    MoreHorizontal,
    Edit,
    Trash2,
} from "lucide-react";
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
    engagement: {
        likes: number;
        comments: number;
        shares: number;
    };
    imageUrl?: string;
}

interface PostCardProps {
    post: Post;
    onSchedule?: (postId: string) => void;
}

export function PostCard({ post, onSchedule }: PostCardProps) {
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
                                <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                {(post.status === "draft" || post.status === "scheduled") && (
                                    <DropdownMenuItem onClick={() => onSchedule?.(post.id)}>
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {post.status === "scheduled" ? "Reschedule" : "Schedule"}
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{post.content}</div>

                {/*{post.imageUrl && (*/}
                {/*  <div className="rounded-lg overflow-hidden">*/}
                {/*    <img*/}
                {/*      src={post.imageUrl || "/placeholder.svg"}*/}
                {/*      alt="Post image"*/}
                {/*      className="w-full h-auto max-h-96 object-cover"*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*)}*/}

                {post.status === "published" && (
                    <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                                <Heart className="h-4 w-4" />
                                <span>{post.engagement.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{post.engagement.comments}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Share2 className="h-4 w-4" />
                                <span>{post.engagement.shares}</span>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {post.engagement.likes +
                                post.engagement.comments +
                                post.engagement.shares}{" "}
                            total engagements
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
