export const qk = {
    posts: (filters?: unknown) => ["posts", filters ?? {}] as const,
    post: (id: string) => ["post", id] as const,
};
