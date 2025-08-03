import { ExternalLink, Linkedin, TrendingUp, Calendar, Target, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ProfileStats } from "@/components/profile-stats";
import { ContentThemes } from "@/components/content-themes";
import { PostingPatterns } from "@/components/posting-patterns";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getLinkedinAuthURL } from "@/utils/linkedin/get-auth-url";

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

    const isEditing = false;
    const isConnected = !!linkedinAccount;

    const profileData = {
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
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Linkedin className="h-5 w-5 text-blue-600" />
                                LinkedIn Connection
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isConnected ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                                        <span className="text-sm">Connected to LinkedIn</span>
                                        {/*<Badge variant="secondary">Active</Badge>*/}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            Disconnect
                                        </Button>
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
                                        <Link href={getLinkedinAuthURL()} target="_blank">
                                            <Linkedin className="mr-2 h-4 w-4" />
                                            Connect LinkedIn
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Profile Preview */}
                    {isConnected && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Profile</CardTitle>
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
                        </Card>
                    )}

                    {/* Content Preferences */}
                    <Tabs defaultValue="preferences" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="preferences">Content Preferences</TabsTrigger>
                            <TabsTrigger value="themes">Content Themes</TabsTrigger>
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
                                        Help AI generate more relevant content for your audience
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Industry</Label>
                                            {isEditing ? (
                                                <Select value={profileData.industry}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Technology">
                                                            Technology
                                                        </SelectItem>
                                                        <SelectItem value="Finance">
                                                            Finance
                                                        </SelectItem>
                                                        <SelectItem value="Healthcare">
                                                            Healthcare
                                                        </SelectItem>
                                                        <SelectItem value="Marketing">
                                                            Marketing
                                                        </SelectItem>
                                                        <SelectItem value="Consulting">
                                                            Consulting
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <p className="text-sm bg-muted p-2 rounded">
                                                    {profileData.industry}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Experience Level</Label>
                                            {isEditing ? (
                                                <Select value={profileData.experience}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0-2 years">
                                                            0-2 years
                                                        </SelectItem>
                                                        <SelectItem value="3-5 years">
                                                            3-5 years
                                                        </SelectItem>
                                                        <SelectItem value="5+ years">
                                                            5+ years
                                                        </SelectItem>
                                                        <SelectItem value="10+ years">
                                                            10+ years
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <p className="text-sm bg-muted p-2 rounded">
                                                    {profileData.experience}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Professional Bio</Label>
                                        {isEditing ? (
                                            <Textarea
                                                value={profileData.bio}
                                                onChange={(e) =>
                                                    console.log({
                                                        ...profileData,
                                                        bio: e.target.value,
                                                    })
                                                }
                                                rows={4}
                                                placeholder="Tell us about your professional background and expertise..."
                                            />
                                        ) : (
                                            <p className="text-sm bg-muted p-3 rounded leading-relaxed">
                                                {profileData.bio}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Target Audience</Label>
                                        {isEditing ? (
                                            <Input
                                                value={profileData.targetAudience}
                                                onChange={(e) =>
                                                    console.log({
                                                        ...profileData,
                                                        targetAudience: e.target.value,
                                                    })
                                                }
                                                placeholder="e.g., Product Managers, Entrepreneurs, Tech Leaders"
                                            />
                                        ) : (
                                            <p className="text-sm bg-muted p-2 rounded">
                                                {profileData.targetAudience}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Content Focus Areas</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.contentFocus.map((focus, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {focus}
                                                    {isEditing && (
                                                        <span className="ml-1 cursor-pointer">
                                                            ×
                                                        </span>
                                                    )}
                                                </Badge>
                                            ))}
                                            {isEditing && (
                                                <Badge variant="outline" className="cursor-pointer">
                                                    + Add Focus Area
                                                </Badge>
                                            )}
                                        </div>
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
                </div>

                {/* Right Column - Stats & Settings */}
                <div className="space-y-6">
                    <ProfileStats />

                    {/* Brand Voice Settings */}
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

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start bg-transparent"
                            >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View LinkedIn Profile
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start bg-transparent"
                            >
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Export Analytics
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start bg-transparent"
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                Content Calendar
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
