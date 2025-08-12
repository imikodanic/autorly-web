"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { LinkedInPost } from "@/lib/api/linkedin-posts/model";

interface DeletePostDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    post: LinkedInPost | null;
    onConfirm: () => void;
}

export function DeletePostDialog({ open, onOpenChange, post, onConfirm }: DeletePostDialogProps) {
    if (!post) return null;

    const getWarningMessage = () => {
        switch (post.status) {
            case "published":
                return "This published post will be permanently deleted. This action cannot be undone.";
            case "scheduled":
                return "This scheduled post will be permanently deleted and will not be published. This action cannot be undone.";
            case "draft":
                return "This draft will be permanently deleted. This action cannot be undone.";
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <DialogTitle>Delete Post</DialogTitle>
                            <DialogDescription className="mt-1">
                                Are you sure you want to delete this post?
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="space-y-4">
                    {/* Warning Message */}
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                        <p className="text-sm text-red-800 font-medium">{getWarningMessage()}</p>
                    </div>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Delete Post
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
