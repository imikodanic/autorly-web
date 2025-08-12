import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error("Error getting authenticated user:", authError);
        return Response.json({ status: 401, error: "User must be authenticated" });
    }

    const { data: linkedinAccount, error } = await supabase
        .from("linkedin_accounts")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (error || !linkedinAccount) {
        console.error("Error fetching LinkedIn account:", error);
        return Response.json({ status: 404, error: "LinkedIn account not found" });
    }

    const linkedinPost = await fetch("https://api.linkedin.com/v2/ugcPosts", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${linkedinAccount.access_token}`,
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0",
        },
        body: JSON.stringify({
            author: `urn:li:person:${linkedinAccount.linkedin_id}`,
            lifecycleState: "PUBLISHED",
            specificContent: {
                "com.linkedin.ugc.ShareContent": {
                    shareCommentary: {
                        text: body.text,
                    },
                    shareMediaCategory: "NONE",
                },
            },
            visibility: {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
            },
        }),
    });

    const publishedPost = await linkedinPost.json();

    return Response.json({
        status: 200,
        message: "Post created successfully",
        post: publishedPost,
    });
}
