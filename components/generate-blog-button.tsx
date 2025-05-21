"use client";

import {Button} from "@/components/ui/button";

export function GenerateBlogButton() {
    const generateBlog = async () => {
        const response = await fetch('/api/blogs/generate', {method: "POST"});
        console.log(await response.json());
    }

    return (
        <Button onClick={generateBlog}>Generate Blog</Button>
    )
}