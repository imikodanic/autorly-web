"use client"

import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {createClient} from "@/utils/supabase/client";
import {useRouter} from "next/navigation";



const formSchema = z.object({
  brandName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(50, {
    message: "Username must not be at more than 50 characters.",
  }),
  about: z.string().min(100, {
    message: "About information must be at least 100 characters.",
  }),
})

export default function Home() {
    const supabase = createClient();
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      about: "",
    },
  })

    const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
        const {data: brandData} = await supabase
          .from('Brands')
          .insert({ name: values.brandName, about: values.about })
          .select();

        const {data} = await supabase.auth.getUser();


      if (brandData && data?.user) {
          await supabase.from("User Brands").insert({user_id: data.user.id, brand_id: brandData[0].id});
      }

    router.push("/dashboard");
  }
  return (
      <div>
        <h1 className="text-4xl font-semibold text-center mt-10 mb-4">Welcome to Autorly!</h1>
          <p className="text-center text-gray-500 text-lg mb-10">Let’s create your brand workspace so Autorly can understand you much better.</p>
        <div className="max-w-lg w-full mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                  control={form.control}
                  name="brandName"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand name</FormLabel>
                        <FormControl>
                          <Input placeholder="Example brand" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>About</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Example Brand is your intelligent content automation platform — built to help startups, solo founders, and lean marketing teams create professional, high-quality blog posts and social media content in seconds. Unlike generic AI writing tools, Example Brand focuses on brand consistency and real marketing outcomes, turning a few simple prompts into publish-ready copy that matches your voice and tone. While others offer templates or shallow AI outputs, Example Brand combines creative depth with ease of use — giving you a competitive edge without needing a full content team. Whether you're growing a SaaS business, managing clients, or building a personal brand, Example Brand helps you publish faster, sound better, and stay consistent." {...field} />
                        </FormControl>
                        <FormDescription>
                          Tell Autorly what you do, your industry, target audience, competitors, etc...
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                  )}
              />
              <Button type="submit">Continue</Button>
            </form>
          </Form>
        </div>
      </div>
  );
}
