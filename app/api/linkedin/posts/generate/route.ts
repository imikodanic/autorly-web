import { OpenAI } from "openai";
import { User } from "@/lib/api/me/model";
import { Profile } from "@/lib/api/profile/model";
import { TopicScoutInstructions } from "@/consts/instructions/topic-scout";
import { WriterAgentInstructions } from "@/consts/instructions/writer-agent";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { LinkedInPost } from "@/lib/api/linkedin-posts/model";

/* ===== Request payload ===== */
type GenerateLinkedInPostRequest = {
    topic?: string; // if missing → Topic Agent (web search)
};

/* ===== Helpers ===== */
// function hardTrimLinkedIn(text: string, max = 1200) {
//     if (!text) return text;
//     if (text.length <= max) return text;
//     const slice = text.slice(0, max);
//     const nb = Math.max(slice.lastIndexOf("\n"), slice.lastIndexOf(". "));
//     return slice.slice(0, nb > 600 ? nb : max).trim();
// }

/* ===== Topic Agent (with web search) ===== */
async function pickTopicWithSearch(
    client: OpenAI,
    input: {
        author: { name: string; bio: string; industry: string; country: string };
        audience: string;
        language: string;
        previousPosts: string[];
    }
) {
    const resp = await client.responses.create({
        model: "gpt-4o",
        tools: [{ type: "web_search_preview" }],
        instructions: TopicScoutInstructions,
        input: JSON.stringify(input),
        temperature: 0.6,
    });

    const text = resp.output_text as string;
    try {
        const json = JSON.parse(text);
        return json?.chosen?.title as string | undefined;
    } catch {
        // Fallback: try to pull a line like: title: "..."
        const m = /"title"\s*:\s*"([^"]{10,120})"/i.exec(text);
        return m?.[1];
    }
}

/* ===== Writer Agent (post generation) ===== */
async function writeLinkedInPost(
    client: OpenAI,
    payload: {
        topic: string;
        author: { name: string; bio: string; industry: string; country: string };
        tone: string;
        audience: string;
        language: string;
        previousPosts: string[];
    }
) {
    const modelInput = {
        topic: payload.topic,
        author: payload.author,
        audience: payload.audience,
        tone: payload.tone || "conversational, clear, no buzzwords",
        language: payload.language,
        cta: "none",
        previousPosts: payload.previousPosts.slice(0, 8),
    };

    const resp = await client.responses.create({
        model: "gpt-4o",
        instructions: WriterAgentInstructions,
        input: JSON.stringify(modelInput),
        temperature: 0.7,
    });

    return resp.output_text?.trim() || "";
}

/* ===== API Route ===== */
export async function POST(request: Request) {
    try {
        const client = new OpenAI();
        const supabase = await createClient();

        const body = (await request.json()) as GenerateLinkedInPostRequest;

        const user = await getUser(supabase);
        const profile = await getProfile(supabase, user.id);
        const previousPosts = (await getPreviousPosts(supabase)).map((p) => p.content);

        if (!user || !profile) {
            return new Response(JSON.stringify({ error: "Missing user or profile" }), {
                status: 400,
            });
        }

        // Build author snapshot
        const author = {
            name: user.linkedinAccount.display_name,
            role: profile.experience || "",
            bio: profile.bio || "",
            industry: profile.industry || "",
            country: profile.country || "",
        };

        // 1) If no topic → Topic Agent (web search) to pick one
        let topic = body.topic?.trim();
        if (!topic) {
            topic = await pickTopicWithSearch(client, {
                author,
                audience: profile.targetAudience,
                language: profile.language ?? "English (US)",
                previousPosts,
            });

            console.log("GENERATED TOPIC", topic);

            if (!topic) {
                return new Response(
                    JSON.stringify({
                        error: "Failed to derive a topic automatically. Please provide a topic.",
                    }),
                    { status: 502 }
                );
            }
        }

        // 2) Writer Agent → generate post
        const post = await writeLinkedInPost(client, {
            topic,
            author,
            tone: "conversational, clear",
            audience: profile.targetAudience,
            language: profile.language ?? "English (US)",
            previousPosts,
        });

        console.log("GENERATED POST", post);

        return Response.json({
            message: "LinkedIn Post generated successfully",
            data: {
                topic,
                content: post,
            },
        });
    } catch (err) {
        console.error("[/api/linkedin/posts/generate] Error:", err);
        return new Response(
            JSON.stringify({
                error: "Failed to generate LinkedIn post",
                details: err ?? String(err),
            }),
            { status: 500 }
        );
    }
}

const getUser = async (supabase: SupabaseClient) => {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error("Error getting authenticated user:", authError);
        throw Error("User must be authenticated");
    }

    const { data: linkedinAccount } = await supabase
        .from("linkedin_accounts")
        .select("*")
        .eq("user_id", user.id)
        .single();

    return {
        ...user,
        linkedinAccount,
    } as User;
};

const getProfile = async (supabase: SupabaseClient, userId: string) => {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (error) throw error;

    return {
        id: data.id,
        industry: data.industry,
        experience: data.experience,
        bio: data.bio,
        targetAudience: data.target_audience,
        country: data.country,
        timezone: data.timezone,
        language: data.language,
    } as Profile;
};

const getPreviousPosts = async (supabase: SupabaseClient) => {
    const { data, error } = await supabase.from("linkedin_posts").select("*");

    if (error) throw error;

    return data as Array<LinkedInPost>;
};
