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

            const profile: Profile = {
                id: data.id,
                industry: data.industry,
                experience: data.experience,
                bio: data.bio,
                targetAudience: data.target_audience,
                country: data.country,
                timezone: data.timezone,
                language: data.language,
            };
            return profile;
        },
        staleTime: 30_000,
    });
}

type UpdateProfileInput = Partial<Omit<Profile, "created_at">>;

export function useUpdateProfile() {
    const supabase = useSupabase();
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (payload: UpdateProfileInput) => {
            const { id, ...rest } = payload;

            const patch = {
                industry: rest.industry,
                experience: rest.experience,
                bio: rest.bio,
                target_audience: rest.targetAudience,
                country: rest.country,
                timezone: rest.timezone,
                language: rest.language,
            };

            const { data, error } = await supabase
                .from("profiles")
                .update(patch)
                .eq("id", id)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (_row, vars) => {
            qc.invalidateQueries({ queryKey: qk.profile(vars.id) });
        },
    });
}
