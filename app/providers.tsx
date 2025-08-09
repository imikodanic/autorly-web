"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserClient } from "@supabase/ssr";

type SupabaseCtx = ReturnType<typeof createBrowserClient>;
const SupabaseContext = createContext<SupabaseCtx | null>(null);
export const useSupabase = () => {
    const c = useContext(SupabaseContext);
    if (!c) throw new Error("Supabase provider missing");
    return c;
};

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClientRef = useRef(
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 30_000,
                    refetchOnWindowFocus: false,
                    retry: 1,
                },
            },
        })
    );

    const supabase = useMemo(
        () =>
            createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            ),
        []
    );

    useEffect(() => {
        const { data: sub } = supabase.auth.onAuthStateChange(() => {
            queryClientRef.current.invalidateQueries();
        });
        return () => sub.subscription.unsubscribe();
    }, [supabase]);

    return (
        <SupabaseContext.Provider value={supabase}>
            <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>
        </SupabaseContext.Provider>
    );
}
