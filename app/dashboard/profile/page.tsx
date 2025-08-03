import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getLinkedinAuthURL } from "@/utils/linkedin/get-auth-url";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const supabase = await createClient();
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        redirect("/login");
    }

    const { data: linkedinAccount } = await supabase
        .from("linkedin_accounts")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (!linkedinAccount) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold">Profile</h1>
                <h2 className="text-xl font-semibold">Your LinkedIn isn&#39;t connected.</h2>
                <Button asChild>
                    <Link href={getLinkedinAuthURL()} target="_blank">
                        Connect
                    </Link>
                </Button>
            </div>
        );
    }

    if (linkedinAccount) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold">Profile</h1>
                <div className="flex items-center space-x-4 mt-2">
                    <Image
                        src={linkedinAccount.avatar_url}
                        alt={linkedinAccount.display_name}
                        className="w-16 h-16 rounded-full"
                        width={64}
                        height={64}
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{linkedinAccount.display_name}</h2>
                    </div>
                </div>
            </div>
        );
    }
}
