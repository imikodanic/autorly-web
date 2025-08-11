export const qk = {
    linkedinPosts: (filters?: unknown) => ["linkedin_posts", filters ?? {}] as const,
    linkedinPost: (id: string) => ["linkedin_post", id] as const,
};
