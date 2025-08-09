import { useSupabase } from "@/app/providers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "./queryKeys";

export function usePosts(filters?: { authorId?: string }) {
    const supabase = useSupabase();
    return useQuery({
        queryKey: qk.posts(filters),
        queryFn: async () => {
            let q = supabase.from("posts").select("*").order("created_at", { ascending: false });
            if (filters?.authorId) q = q.eq("author_id", filters.authorId);
            const { data, error } = await q;
            if (error) throw error;
            return data;
        },
    });
}

export function usePost(id?: string) {
    const supabase = useSupabase();
    return useQuery({
        queryKey: qk.post(id!),
        enabled: !!id,
        queryFn: async () => {
            const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
            if (error) throw error;
            return data;
        },
    });
}

export function useCreatePost() {
    const supabase = useSupabase();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload: { title: string; content: string }) => {
            const { data, error } = await supabase.from("posts").insert(payload).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            // ✅ just invalidate the list
            qc.invalidateQueries({ queryKey: qk.posts() });
        },
    });
}

export function useUpdatePost() {
    const supabase = useSupabase();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload: { id: string; title?: string; content?: string }) => {
            const { data, error } = await supabase
                .from("posts")
                .update(payload)
                .eq("id", payload.id)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (_d, p) => {
            qc.invalidateQueries({ queryKey: qk.post(p.id) });
            qc.invalidateQueries({ queryKey: qk.posts() });
        },
    });
}

export function useDeletePost() {
    const supabase = useSupabase();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("posts").delete().eq("id", id);
            if (error) throw error;
            return id;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: qk.posts() });
        },
    });
}
