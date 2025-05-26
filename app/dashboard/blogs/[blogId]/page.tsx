import { createClient } from "@/utils/supabase/server";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { mdxComponents } from "@/mdx-components";

type BlogPageParameters = {
    blogId: string;
};

export default async function Page({ params }: { readonly params: Promise<BlogPageParameters> }) {
    const { blogId } = await params;

    const supabase = await createClient();

    const { data: blog } = await supabase.from("Blogs").select("*").eq("id", blogId).single();

    if (!blogId) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="container mx-auto py-10 max-w-3xl">
            <h1 className="text-4xl font-semibold">{blog.title}</h1>
            <div>
                <MDXRemote source={blog.content} components={mdxComponents} />
            </div>
        </div>
    );
}
