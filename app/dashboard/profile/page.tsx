"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getLinkedinAuthURL } from "@/utils/linkedin/get-auth-url";

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
            <h1>Connect to Linkedin</h1>
            <Button asChild>
                <Link href={getLinkedinAuthURL()} target="_blank">
                    Connect
                </Link>
            </Button>

            <Button
                onClick={() => {
                    void postToLinkedin();
                }}
            >
                Post
            </Button>
        </div>
    );
}
