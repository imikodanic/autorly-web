import { useSupabase } from "@/app/providers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "./queryKeys";
import type { InsertLinkedInPost, UpdateLinkedInPost, LinkedInPostStatus } from "./model";

type ListFilters = {
    status?: LinkedInPostStatus;
    from?: string; // ISO created_at >= from
    to?: string; // ISO created_at <= to
    limit?: number;
    offset?: number;
    search?: string; // naive content search
};

export function useLinkedInPosts(filters?: ListFilters) {
    const supabase = useSupabase();

    return useQuery({
        queryKey: qk.linkedinPosts(filters),
        queryFn: async () => {
            let q = supabase
                .from("linkedin_posts")
                .select("*")
                .order("created_at", { ascending: false });

            if (filters?.status) q = q.eq("status", filters.status);
            if (filters?.from) q = q.gte("created_at", filters.from);
            if (filters?.to) q = q.lte("created_at", filters.to);
            if (filters?.search) q = q.ilike("content", `%${filters.search}%`);

            if (typeof filters?.limit === "number") {
                const offset = filters.offset ?? 0;
                const to = offset + filters.limit - 1;
                q = q.range(offset, to);
            }

            const { data, error } = await q.returns();
            if (error) throw error;
            return data;
        },
    });
}

// SINGLE
export function useLinkedInPost(id?: string) {
    const supabase = useSupabase();

    return useQuery({
        queryKey: id ? qk.linkedinPost(id) : ["linkedin_post", "nil"],
        enabled: !!id,
        queryFn: async () => {
            const { data, error } = await supabase
                .from("linkedin_posts")
                .select("*")
                .eq("id", id)
                .single()
                .returns();

            if (error) throw error;
            return data;
        },
    });
}

export function useCreateLinkedInPost() {
    const supabase = useSupabase();
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (payload: InsertLinkedInPost) => {
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;

            const insertPayload = { ...payload, user_id: userData.user.id };

            const { data, error } = await supabase
                .from("linkedin_posts")
                .insert(insertPayload)
                .select()
                .single()
                .returns();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: qk.linkedinPosts() });
        },
    });
}

export function useUpdateLinkedInPost() {
    const supabase = useSupabase();
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (payload: UpdateLinkedInPost) => {
            const { id, ...patch } = payload;
            const { data, error } = await supabase
                .from("linkedin_posts")
                .update(patch)
                .eq("id", id)
                .select()
                .single()
                .returns();

            if (error) throw error;
            return data;
        },
        onSuccess: (row) => {
            qc.invalidateQueries({ queryKey: qk.linkedinPost(row.id) });
            qc.invalidateQueries({ queryKey: qk.linkedinPosts() });
        },
    });
}

export function useDeleteLinkedInPost() {
    const supabase = useSupabase();
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("linkedin_posts").delete().eq("id", id);
            if (error) throw error;
            return id;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: qk.linkedinPosts() });
        },
    });
}
