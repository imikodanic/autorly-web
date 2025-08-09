import { useSupabase } from "@/app/providers";
import { useQuery } from "@tanstack/react-query";
import { qk } from "./queryKeys";

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

            return { ...data.user, linkedinAccount };
        },
    });
}
