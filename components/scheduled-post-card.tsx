"use client";

import { Calendar, Clock, Edit, Trash2, MoreHorizontal, Eye } from "lucide-react";
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
import { format } from "date-fns";

interface Post {
    id: string;
    content: string;
    scheduledFor: Date;
    status: "scheduled" | "published" | "draft";
    platform: string;
    imageUrl?: string;
}

interface ScheduledPostCardProps {
    post: Post;
    onPreview: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function ScheduledPostCard({ post, onPreview, onEdit, onDelete }: ScheduledPostCardProps) {
    const getStatusBadge = () => {
        switch (post.status) {
            case "scheduled":
                return (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>
                );
            case "published":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Published
                    </Badge>
                );
            case "draft":
                return <Badge variant="secondary">Draft</Badge>;
        }
    };

    return (
        <Card
            className="w-full cursor-pointer hover:shadow-md transition-shadow"
            onClick={onPreview}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>YN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Your Name</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {format(post.scheduledFor, "MMM d, yyyy")}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {format(post.scheduledFor, "h:mm a")}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                    {post.platform}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {getStatusBadge()}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={onPreview}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onEdit}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onDelete} className="text-red-600">
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
                {/*      className="w-full h-auto max-h-64 object-cover"*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*)}*/}

                <div className="flex items-center justify-between pt-3 border-t text-sm text-muted-foreground">
                    <div>Scheduled for {format(post.scheduledFor, "EEEE, MMMM d 'at' h:mm a")}</div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit();
                            }}
                            className="bg-transparent"
                        >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
