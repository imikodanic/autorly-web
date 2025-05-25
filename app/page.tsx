import { redirect } from "next/navigation";
import {createClient} from "@/utils/supabase/server";

export default async function RootPage() {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    const { user } = data

    const { data: brandData } = await supabase.from('User Brands').select(`
      id,
      Brands (
        id,
        name,
        about
      )
    `).eq('user_id', user.id).single();

    if (brandData?.Brands) {
        redirect(`/dashboard/blogs`);
    }

    redirect('/new-brand')
}