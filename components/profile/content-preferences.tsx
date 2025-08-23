"use client";

import { useEffect, useState } from "react";
import { Globe, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { ContentThemes } from "../content-themes";
import { PostingPatterns } from "../posting-patterns";
import { useProfile } from "@/lib/api/profile/hook";
import { useUpdateProfile } from "@/lib/api/profile/hook";
import { useMe } from "@/lib/api/me/hook";
import { PageLoadingState } from "../page-loading-state";
import { Button } from "../ui/button";

export function ContentPreferences() {
    const { data: me, isLoading: userLoading } = useMe();
    const { data: profile, isLoading: profileLoading } = useProfile(me?.id);
    const update = useUpdateProfile();

    const [form, setForm] = useState({
        industry: "",
        experience: "",
        bio: "",
        targetAudience: "",
        country: "",
        timezone: "",
        language: "",
    });

    // Sync local form when profile loads/changes
    useEffect(() => {
        if (profile) {
            setForm({
                industry: profile.industry ?? "",
                experience: profile.experience ?? "",
                bio: profile.bio ?? "",
                targetAudience: profile.targetAudience ?? "",
                country: profile.country ?? "",
                timezone: profile.timezone ?? "",
                language: profile.language ?? "",
            });
        }
    }, [profile]);

    if (userLoading || profileLoading) return <PageLoadingState />;
    if (!profile || !me) return null;

    const onSave = () =>
        update.mutate({
            id: me.id,
            ...form,
        });

    return (
        <Tabs defaultValue="preferences" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="preferences">Content Preferences</TabsTrigger>
                {/* <TabsTrigger value="themes">Content Themes</TabsTrigger> */}
                <TabsTrigger value="patterns">Posting Patterns</TabsTrigger>
            </TabsList>

            <TabsContent value="preferences" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Content Preferences
                        </CardTitle>
                        <CardDescription>
                            Help Autorly generate more relevant content for your audience
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Industry</Label>
                                <Select
                                    value={form.industry}
                                    onValueChange={(v) => setForm((s) => ({ ...s, industry: v }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {INDUSTRY_OPTIONS.map((industry) => (
                                            <SelectItem key={industry} value={industry}>
                                                {industry}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Experience Level</Label>
                                <Select
                                    value={form.experience}
                                    onValueChange={(v) => setForm((s) => ({ ...s, experience: v }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select experience" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0-2 years">0-2 years</SelectItem>
                                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                                        <SelectItem value="5+ years">5+ years</SelectItem>
                                        <SelectItem value="10+ years">10+ years</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Professional Bio</Label>
                            <Textarea
                                value={form.bio}
                                onChange={(e) => setForm((s) => ({ ...s, bio: e.target.value }))}
                                rows={4}
                                placeholder="Tell us about your professional background and expertise..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Target Audience</Label>
                            <Input
                                value={form.targetAudience}
                                onChange={(e) =>
                                    setForm((s) => ({ ...s, targetAudience: e.target.value }))
                                }
                                placeholder="e.g., Product Managers, Entrepreneurs, Tech Leaders"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={onSave} disabled={update.isPending}>
                                {update.isPending ? "Saving…" : "Save changes"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Regional Settings
                        </CardTitle>
                        <CardDescription>Configure your location and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm">Country/Region</Label>
                            <Select
                                value={form.country}
                                onValueChange={(v) => setForm((s) => ({ ...s, country: v }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                    {COUNTRY_OPTIONS.map((country) => (
                                        <SelectItem key={country} value={country}>
                                            {country}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm">Timezone</Label>
                            <Select
                                value={form.timezone}
                                onValueChange={(v) => setForm((s) => ({ ...s, timezone: v }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TIMEZONE_OPTIONS.map((timezone) => (
                                        <SelectItem key={timezone} value={timezone}>
                                            {timezone}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm">Language</Label>
                            <Select
                                value={form.language}
                                onValueChange={(v) => setForm((s) => ({ ...s, language: v }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {LANGUAGE_OPTIONS.map((language) => (
                                        <SelectItem key={language} value={language}>
                                            {language}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={onSave} disabled={update.isPending}>
                                {update.isPending ? "Saving…" : "Save changes"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="themes">
                <ContentThemes />
            </TabsContent>

            <TabsContent value="patterns">
                <PostingPatterns />
            </TabsContent>
        </Tabs>
    );
}

const INDUSTRY_OPTIONS = [
    "Technology",
    "SaaS",
    "Artificial Intelligence / ML",
    "Cybersecurity",
    "Fintech / Finance",
    "Healthcare",
    "Biotechnology / Pharma",
    "E-commerce",
    "Retail",
    "Marketing / Advertising",
    "Media / Entertainment",
    "Gaming",
    "Education",
    "Consulting",
    "Real Estate",
    "Legal",
    "HR / Recruiting",
    "Travel / Hospitality",
    "Transportation / Logistics",
    "Manufacturing",
    "Energy / Utilities",
    "Telecommunications",
    "Automotive",
    "Nonprofit",
    "Government / Public Sector",
] as const;

export const COUNTRY_OPTIONS = [
    "Argentina",
    "Australia",
    "Austria",
    "Bangladesh",
    "Belgium",
    "Bosnia and Herzegovina",
    "Brazil",
    "Bulgaria",
    "Canada",
    "Chile",
    "China",
    "Colombia",
    "Croatia",
    "Czech Republic",
    "Denmark",
    "Egypt",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hong Kong",
    "Hungary",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Kenya",
    "Malaysia",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Pakistan",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Serbia",
    "Singapore",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Turkey",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Vietnam",
];

export const TIMEZONE_OPTIONS = [
    "Pacific/Midway",
    "Pacific/Honolulu",
    "America/Anchorage",
    "America/Los_Angeles", // Pacific Time (PT)
    "America/Denver", // Mountain Time (MT)
    "America/Chicago", // Central Time (CT)
    "America/New_York", // Eastern Time (ET)
    "America/Toronto",
    "America/Mexico_City",
    "America/Sao_Paulo",
    "America/Argentina/Buenos_Aires",

    "Europe/London", // GMT / BST
    "Europe/Dublin",
    "Europe/Lisbon",
    "Europe/Paris", // CET / CEST
    "Europe/Berlin",
    "Europe/Rome",
    "Europe/Amsterdam",
    "Europe/Stockholm",
    "Europe/Oslo",
    "Europe/Helsinki",
    "Europe/Athens",
    "Europe/Istanbul",
    "Europe/Moscow",
    "Europe/Kiev",
    "Europe/Warsaw",
    "Europe/Prague",
    "Europe/Bucharest",
    "Europe/Sofia",
    "Europe/Belgrade",
    "Europe/Zagreb",

    "Africa/Cairo",
    "Africa/Nairobi",
    "Africa/Johannesburg",
    "Africa/Lagos",

    "Asia/Dubai",
    "Asia/Jerusalem",
    "Asia/Tehran",
    "Asia/Karachi",
    "Asia/Kolkata", // India Standard Time
    "Asia/Dhaka",
    "Asia/Bangkok",
    "Asia/Singapore",
    "Asia/Hong_Kong",
    "Asia/Shanghai",
    "Asia/Tokyo", // JST
    "Asia/Seoul", // KST
    "Asia/Kuala_Lumpur",
    "Asia/Jakarta",
    "Asia/Manila",

    "Australia/Perth",
    "Australia/Adelaide",
    "Australia/Sydney",
    "Pacific/Auckland",
];

export const LANGUAGE_OPTIONS = [
    "English (US)",
    "English (UK)",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese (Brazil)",
    "Portuguese (Portugal)",
    "Dutch",
    "Swedish",
    "Norwegian",
    "Danish",
    "Finnish",
    "Polish",
    "Czech",
    "Slovak",
    "Hungarian",
    "Romanian",
    "Croatian",
    "Bulgarian",
    "Greek",
    "Turkish",
    "Russian",
    "Ukrainian",
    "Arabic",
    "Hebrew",
    "Hindi",
    "Bengali",
    "Urdu",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Japanese",
    "Korean",
    "Vietnamese",
    "Thai",
    "Indonesian",
    "Malay",
];
