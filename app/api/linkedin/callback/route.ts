import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export type UserInfo = {
    sub: string;
    email_verified: boolean;
    name: string;
    locale: { country: string; language: string };
    given_name: string;
    family_name: string;
    email: string;
    picture: string;
};

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const code = searchParams.get("code")!;

    const params = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!,
        client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    });

    const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
    });

    const tokenData = await tokenRes.json();

    const { access_token, expires_in } = tokenData;

    const userInfo = await getUserInfo(access_token);

    const linkedinAccount = await saveLinkedinAccountToDatabase(userInfo, access_token, expires_in);

    return Response.json({ status: 200, account: linkedinAccount });
}

async function getUserInfo(accessToken: string): Promise<UserInfo> {
    const res = await fetch("https://api.linkedin.com/v2/userinfo", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return await res.json();
}

async function saveLinkedinAccountToDatabase(
    userInfo: UserInfo,
    accessToken: string,
    expiresIn: number
) {
    const supabase = await createClient();

    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error("Error getting authenticated user:", authError);
        throw new Error("User must be authenticated");
    }

    const { data, error } = await supabase
        .from("linkedin_accounts")
        .insert([
            {
                user_id: user.id,
                linkedin_id: userInfo.sub,
                account_type: "personal",
                access_token: accessToken,
                expires_at: expiresAt,
                display_name: userInfo.name,
                avatar_url: userInfo.picture,
            },
        ])
        .select();

    if (error) {
        console.error("Error saving LinkedIn account to database:", error);
        throw new Error("Failed to save LinkedIn account to database");
    }

    return data;
}
