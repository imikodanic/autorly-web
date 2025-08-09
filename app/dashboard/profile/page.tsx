import { Linkedin, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ProfileStats } from "@/components/profile-stats";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getLinkedinAuthURL } from "@/utils/linkedin/get-auth-url";
import { ContentPreferences } from "@/components/profile/content-preferences";
import { DisconnectLinkedInDialog } from "@/components/profile/disconnect-linkedin-dialog";
import { Profile } from "@/lib/api/profile/model";

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

    const isConnected = !!linkedinAccount;

    const profileData: Profile = {
        id: "asd",
        picture: linkedinAccount?.avatar_url,
        name: linkedinAccount?.display_name,
        headline: "Headline",
        bio: "Some detailed bio about the user, highlighting their expertise and professional background.",
        industry: "Industry",
        location: "San Francisco, CA",
        company: "TechCorp",
        experience: "5+ years",
        targetAudience: "Product Managers, Entrepreneurs, Tech Leaders",
        contentFocus: ["Product Management", "AI & Technology", "Startup Insights", "Leadership"],
    };

    return (
        <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                    <p className="text-muted-foreground">
                        Manage your LinkedIn presence and content preferences
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* LinkedIn Connection Status */}
                    <Card className="gap-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Linkedin className="h-5 w-5 text-blue-600" />
                                LinkedIn Connection
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg p-4 bg-white">
                                <div className="flex items-start gap-3">
                                    <div className="relative">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={profileData.picture} />
                                            <AvatarFallback>AJ</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{profileData.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {profileData.headline}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {profileData.company} • {profileData.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardContent>
                            {isConnected ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                                        <span className="text-sm">Connected to LinkedIn</span>
                                        {/*<Badge variant="secondary">Active</Badge>*/}
                                    </div>
                                    <div className="flex gap-2">
                                        <DisconnectLinkedInDialog />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <Linkedin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="font-semibold mb-2">
                                        Connect Your LinkedIn Account
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Connect your LinkedIn account to start publishing and
                                        tracking your posts
                                    </p>
                                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                        <Link href={getLinkedinAuthURL()}>
                                            <Linkedin className="mr-2 h-4 w-4" />
                                            Connect LinkedIn
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    {/* Content Preferences */}
                    <ContentPreferences profileData={profileData} />
                </div>

                {/* Right Column - Stats & Settings */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Palette className="h-5 w-5" />
                                Brand Voice
                            </CardTitle>
                            <CardDescription>Customize how AI writes in your voice</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm">Professional Tone</Label>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm">Use Emojis</Label>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm">Include Questions</Label>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm">Add Hashtags</Label>
                                    <Switch defaultChecked />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm">Writing Style</Label>
                                <Select defaultValue="conversational">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="professional">Professional</SelectItem>
                                        <SelectItem value="conversational">
                                            Conversational
                                        </SelectItem>
                                        <SelectItem value="inspiring">Inspiring</SelectItem>
                                        <SelectItem value="educational">Educational</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                    <ProfileStats />
                </div>
            </div>
        </div>
    );
}
