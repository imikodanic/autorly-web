"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
} from "date-fns";
import { LinkedInPost } from "@/lib/api/linkedin-posts/model";

interface CalendarViewProps {
    currentDate: Date;
    posts: LinkedInPost[];
    viewMode?: "month" | "week";
    onPreviewPost: (postId: string) => void;
    onEditPost: (postId: string) => void;
    onDeletePost: (postId: string) => void;
}

export function CalendarView({
    currentDate,
    posts,
    viewMode = "month",
    onPreviewPost,
    onEditPost,
    onDeletePost,
}: CalendarViewProps) {
    const getCalendarDays = () => {
        if (viewMode === "week") {
            const start = startOfWeek(currentDate);
            const end = endOfWeek(currentDate);
            return eachDayOfInterval({ start, end });
        } else {
            const start = startOfWeek(startOfMonth(currentDate));
            const end = endOfWeek(endOfMonth(currentDate));
            return eachDayOfInterval({ start, end });
        }
    };

    const getPostsForDate = (date: Date) => {
        return posts.filter((post) => isSameDay(new Date(post.scheduled_at ?? ""), date));
    };

    const calendarDays = getCalendarDays();

    if (viewMode === "week") {
        return (
            <div className="grid grid-cols-7 gap-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                        key={day}
                        className="text-center font-medium text-sm text-muted-foreground p-2"
                    >
                        {day}
                    </div>
                ))}
                {calendarDays.map((day, index) => {
                    const dayPosts = getPostsForDate(day);
                    return (
                        <Card
                            key={index}
                            className={`min-h-[200px] ${isToday(day) ? "ring-2 ring-blue-500" : ""}`}
                        >
                            <CardContent className="p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span
                                        className={`text-sm font-medium ${isToday(day) ? "text-blue-600" : ""}`}
                                    >
                                        {format(day, "d")}
                                    </span>
                                    {dayPosts.length > 0 && (
                                        <Badge variant="secondary" className="text-xs">
                                            {dayPosts.length}
                                        </Badge>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    {dayPosts.slice(0, 3).map((post) => (
                                        <div
                                            key={post.id}
                                            className="bg-blue-50 border border-blue-200 rounded p-2 text-xs cursor-pointer hover:bg-blue-100"
                                            onClick={() => onPreviewPost(post.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-blue-700">
                                                    {format(
                                                        new Date(post.scheduled_at ?? ""),
                                                        "HH:mm"
                                                    )}
                                                </span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-4 w-4 p-0"
                                                        >
                                                            <MoreHorizontal className="h-3 w-3" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() => onPreviewPost(post.id)}
                                                        >
                                                            <Eye className="mr-2 h-3 w-3" />
                                                            Preview
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => onEditPost(post.id)}
                                                        >
                                                            <Edit className="mr-2 h-3 w-3" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => onDeletePost(post.id)}
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-3 w-3" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <p className="text-blue-600 truncate mt-1">
                                                {post.content.substring(0, 30)}...
                                            </p>
                                        </div>
                                    ))}
                                    {dayPosts.length > 3 && (
                                        <div className="text-xs text-muted-foreground text-center">
                                            +{dayPosts.length - 3} more
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-4">
                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                    (day) => (
                        <div
                            key={day}
                            className="text-center font-medium text-sm text-muted-foreground p-2"
                        >
                            {day}
                        </div>
                    )
                )}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4">
                {calendarDays.map((day, index) => {
                    const dayPosts = getPostsForDate(day);
                    const isCurrentMonth = isSameMonth(day, currentDate);

                    return (
                        <Card
                            key={index}
                            className={`min-h-[120px] ${isToday(day) ? "ring-2 ring-blue-500" : ""} ${
                                !isCurrentMonth ? "opacity-50" : ""
                            }`}
                        >
                            <CardContent className="p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span
                                        className={`text-sm font-medium ${isToday(day) ? "text-blue-600" : ""}`}
                                    >
                                        {format(day, "d")}
                                    </span>
                                    {dayPosts.length > 0 && (
                                        <Badge variant="secondary" className="text-xs">
                                            {dayPosts.length}
                                        </Badge>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    {dayPosts.slice(0, 2).map((post) => (
                                        <div
                                            key={post.id}
                                            className="bg-blue-50 border border-blue-200 rounded p-1 text-xs cursor-pointer hover:bg-blue-100"
                                            onClick={() => onPreviewPost(post.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-blue-700">
                                                    {format(
                                                        new Date(post.scheduled_at ?? ""),
                                                        "HH:mm"
                                                    )}
                                                </span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-4 w-4 p-0"
                                                        >
                                                            <MoreHorizontal className="h-3 w-3" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() => onPreviewPost(post.id)}
                                                        >
                                                            <Eye className="mr-2 h-3 w-3" />
                                                            Preview
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => onEditPost(post.id)}
                                                        >
                                                            <Edit className="mr-2 h-3 w-3" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => onDeletePost(post.id)}
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-3 w-3" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <p className="text-blue-600 truncate">
                                                {post.content.substring(0, 20)}...
                                            </p>
                                        </div>
                                    ))}
                                    {dayPosts.length > 2 && (
                                        <div className="text-xs text-muted-foreground text-center">
                                            +{dayPosts.length - 2} more
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
