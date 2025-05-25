"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Blog = {
    id: string
    title: string
    topic: string
    content: string;
    created_at: string
}

export const columns: ColumnDef<Blog>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "topic",
        header: "Topic",
    },
    {
        accessorKey: "created_at",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const blog = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => {
                            window.open(`/dashboard/blogs/${blog.id}`, "_blank", "noopener,noreferrer");
                        }}>
                            View blog
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(blog.content)}>
                            Copy content
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
