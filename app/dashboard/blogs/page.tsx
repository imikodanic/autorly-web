"use client";

import { Blog, columns } from "./columns"
import { DataTable } from "./data-table"
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Progress} from "@/components/ui/progress";

export type Brand = {
    id: string
    name: string
    about: string
}

export default function Page() {
    const supabase = createClient()
    const [brand, setBrand] = useState<Brand | null>(null)
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [blogProgress, setBlogProgress] = useState<number>(0);

    async function getBlogs() {
        const brandData = await getUserBrand() as unknown as Brand;
        if (!brandData) {
            console.error("Brand is not set");
            return;
        }

        setBrand(brandData);

        const { data, error } = await supabase
            .from("Blogs")
            .select("*")
            .eq("brand_id", brandData.id)

        if (error) {
            console.error("Failed to fetch blogs:", error);
            return;
        }

        const formattedBlogs: Blog[] = data.map((blog: Blog) => ({
            id: blog.id,
            title: blog.title,
            topic: blog.topic,
            content: blog.content,
            created_at: new Date(blog.created_at).toLocaleDateString("hr"),
        }));

        setBlogs(formattedBlogs);
    }

    async function generateBlog() {
        // Change blog progress every 500ms
        let progress = 0;
        const interval = setInterval(() => {
            progress += 0.03;
            setBlogProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 10);

        const response = await fetch("/api/blogs/generate", {
            method: "POST",
            body: JSON.stringify({
                brand: brand,
                oldBlogs: blogs.map(blog => blog.title)
            })
        })

        setBlogProgress(100)
        clearInterval(interval);

        const { data } = await response.json();
        if (!data || !brand) {
            console.error("Failed to generate a blog");
            return;
        }

        const formattedData: Blog = JSON.parse(data)

        const { data: blogData } = await supabase
            .from("Blogs")
            .insert({
                title: formattedData.title,
                topic:formattedData.topic,
                content: formattedData.content,
                brand_id: brand.id
            })
            .select()

        if (!blogData || blogData.length === 0) {
            console.error("Failed to insert the blog into the database");
            return;
        }

        setBlogs(prevBlogs => [
            ...prevBlogs,
            {
                id: blogData[0].id,
                title: blogData[0].title,
                topic: blogData[0].topic,
                content: blogData[0].content,
                created_at: new Date(blogData[0].created_at).toLocaleDateString("hr"),
            }
        ])
    }

    async function getUser() {
        const {data, error} = await supabase.auth.getUser()
        if (error || !data?.user) {
            redirect('/login')
        }

        return data.user
    }

    async function getUserBrand() {
        const user = await getUser()

        const { data } = await supabase.from('User Brands').select(`
      id,
      Brands (
        id,
        name,
        about
      )
    `).eq('user_id', user.id).single()

        if (data?.Brands) {
            return data?.Brands;
        }

        redirect('/new-brand')
    }

    useEffect(() => {
        getBlogs();
    })

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-semibold mb-8">Blogs</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button onClick={generateBlog}>Generate Blog</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Generating your new blog</DialogTitle>
                            <DialogDescription>
                                {
                                    blogProgress === 100
                                        ? "Your blog has been generated successfully! Check it out in the table below."
                                        : "Your blog will be created shortly, sit tight and let Autorly do the rest!"
                                }
                            </DialogDescription>
                        </DialogHeader>
                        <Progress value={blogProgress} className="w-full mt-10 h-5" />
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable columns={columns} data={blogs}/>
        </div>
    )
}
