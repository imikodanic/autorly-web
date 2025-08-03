"use client";

import { Calendar, Clock, Edit, Trash2, Linkedin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface Post {
    id: string;
    content: string;
    scheduledFor: Date;
    status: "scheduled" | "published" | "draft";
    platform: string;
    imageUrl?: string;
}

interface PostPreviewDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    post: Post | null;
    onEdit: () => void;
    onDelete: () => void;
}

export function PostPreviewDialog({
    open,
    onOpenChange,
    post,
    onEdit,
    onDelete,
}: PostPreviewDialogProps) {
    if (!post) return null;

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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="flex items-center gap-2">
                            <Linkedin className="h-5 w-5 text-blue-600" />
                            Post Preview
                        </DialogTitle>
                        <div className="flex items-center gap-2">{getStatusBadge()}</div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Post Preview */}
                    <div className="border rounded-lg p-4 bg-white">
                        <div className="flex items-start gap-3 mb-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                                <AvatarFallback>YN</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h3 className="font-semibold">Your Name</h3>
                                <p className="text-sm text-muted-foreground">
                                    Your Professional Title
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Scheduled for{" "}
                                    {format(post.scheduledFor, "MMM d, yyyy 'at' h:mm a")}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                {post.content}
                            </div>

                            {/*{post.imageUrl && (*/}
                            {/*  <div className="rounded-lg overflow-hidden">*/}
                            {/*    <img*/}
                            {/*      src={post.imageUrl || "/placeholder.svg"}*/}
                            {/*      alt="Post image"*/}
                            {/*      className="w-full h-auto max-h-96 object-cover"*/}
                            {/*    />*/}
                            {/*  </div>*/}
                            {/*)}*/}

                            {/* LinkedIn-style engagement buttons */}
                            <div className="flex items-center justify-between pt-3 border-t">
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                    <button className="flex items-center gap-1 hover:text-blue-600">
                                        👍 Like
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-blue-600">
                                        💬 Comment
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-blue-600">
                                        🔄 Repost
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-blue-600">
                                        📤 Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Post Details */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Post Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Date:</span>
                                <span>{format(post.scheduledFor, "MMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Time:</span>
                                <span>{format(post.scheduledFor, "h:mm a")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Linkedin className="h-4 w-4 text-blue-600" />
                                <span className="text-muted-foreground">Platform:</span>
                                <span>{post.platform}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Status:</span>
                                {getStatusBadge()}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="bg-transparent"
                        >
                            Close
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    onDelete();
                                    onOpenChange(false);
                                }}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                            <Button onClick={onEdit} className="bg-blue-600 hover:bg-blue-700">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Post
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
