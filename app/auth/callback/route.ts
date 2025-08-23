import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") || "/dashboard"; // fallback

    if (code) {
        const supabase = await createClient();
        // This sets the auth cookies server-side
        await supabase.auth.exchangeCodeForSession(code);
    }

    // Optional: handle `error` param
    const error = searchParams.get("error_description") || searchParams.get("error");
    if (error) {
        return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error)}`, origin));
    }

    return NextResponse.redirect(new URL(next, origin));
}
