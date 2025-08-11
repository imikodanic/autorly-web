export type LinkedInPostStatus = "draft" | "scheduled" | "published";

export interface LinkedInPost {
    id: string;
    user_id: string;
    status: LinkedInPostStatus;
    content: string;
    scheduled_at: string | null; // ISO timestamptz
    published_at: string | null; // ISO timestamptz
    created_at: string; // ISO timestamptz
    error_message: string | null;
    post_url: string | null;
}

// What the client can send when creating a post
export interface InsertLinkedInPost {
    content: string;
    status?: LinkedInPostStatus; // default server-side: 'draft'
    scheduled_at?: string | null; // ISO string or null
}

// What the client can send when updating a post
export interface UpdateLinkedInPost {
    id: string;
    content?: string;
    status?: Exclude<LinkedInPostStatus, never>; // usually 'draft' <-> 'scheduled'
    scheduled_at?: string | null;
    // published_at / post_url should be set by your publisher (service key), not the client
}
