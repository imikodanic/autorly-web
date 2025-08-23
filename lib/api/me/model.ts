export type User = {
    id: string;
    email: string;
    created_at: string;
    linkedinAccount: LinkedinAccount;
};

export type LinkedinAccount = {
    id: string;
    user_id: string;
    linkedin_id: string;
    account_type: "personal" | "company";
    access_token: string;
    refresh_token: string;
    expires_at: string;
    display_name: string;
    avatar_url: string;
    created_at: string;
    updated_at: string;
};
