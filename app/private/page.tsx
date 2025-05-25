"use client";

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'
import {GenerateBlogButton} from "@/components/generate-blog-button";

export default async function PrivatePage() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <GenerateBlogButton />
    )
}