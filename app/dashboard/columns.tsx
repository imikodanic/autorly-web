"use client"

import { ColumnDef } from "@tanstack/react-table"

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
]
