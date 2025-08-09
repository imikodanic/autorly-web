import { useSupabase } from "@/app/providers";
import { qk } from "./queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Profile } from "./model";

export function useProfile(userId?: string) {
    const supabase = useSupabase();
    return useQuery({
        queryKey: qk.profile(userId),
        enabled: !!userId,
        queryFn: async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            if (error) throw error;

            return data;
        },
    });
}

export function useUpdateProfile() {
    const supabase = useSupabase();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload: Profile) => {
            const { data, error } = await supabase
                .from("profiles")
                .update(payload)
                .eq("id", payload.id)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        // Optimistic update
        onMutate: async (payload) => {
            await qc.cancelQueries({ queryKey: qk.profile(payload.id) });
            const prev = qc.getQueryData(qk.profile(payload.id));
            qc.setQueryData(qk.profile(payload.id), (old: Profile) => ({ ...old, ...payload }));
            return { prev };
        },
        onError: (_e, p, ctx) => {
            if (ctx?.prev) qc.setQueryData(qk.profile(p.id), ctx.prev);
        },
        onSettled: (_d, _e, payload) => {
            qc.invalidateQueries({ queryKey: qk.profile(payload.id) });
        },
    });
}
