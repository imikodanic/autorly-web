import { useSupabase } from "@/app/providers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "./queryKeys";
import { User } from "./model";

export function useMe() {
    const supabase = useSupabase();
    return useQuery({
        queryKey: qk.me,
        queryFn: async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) throw error;

            const { data: linkedinAccount } = await supabase
                .from("linkedin_accounts")
                .select("*")
                .eq("user_id", data.user.id)
                .single();

            if (!data.user) return null;

            return { ...data.user, linkedinAccount } as User;
        },
    });
}

export function useDisconnectLinkedin() {
    const supabase = useSupabase();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { data, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;

            const { error } = await supabase
                .from("linkedin_accounts")
                .delete()
                .eq("user_id", data.user.id);
            if (error) throw error;
            return data.user.id;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: qk.me });
        },
    });
}
