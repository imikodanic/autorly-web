"use client";

import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const postToLinkedin = async () => {
        const response = await fetch("/api/linkedin/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: "Testing stuff...",
            }),
        });

        if (!response.ok) {
            console.error("Failed to post to LinkedIn:", response.statusText);
        }
    };

    return (
        <div>
            <h1>Autorly Dashboard</h1>
            <Button onClick={postToLinkedin}>Post to LinkedIn</Button>
        </div>
    );
}
