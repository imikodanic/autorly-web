"use client";

import { Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { ContentThemes } from "../content-themes";
import { PostingPatterns } from "../posting-patterns";
import { RegionalSettingsSection } from "../regional-settings-section";
import { useProfile } from "@/lib/api/profile/hook";
import { useMe } from "@/lib/api/me/hook";
import { PageLoadingState } from "../page-loading-state";

export function ContentPreferences() {
    const { data: me, isLoading: userLoading } = useMe();

    const { data: profile, isLoading: profileLoading } = useProfile(me?.id);

    if (userLoading || profileLoading) return <PageLoadingState />;

    if (!profile) return;

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
                                <Select value={profile.industry}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Technology">Technology</SelectItem>
                                        <SelectItem value="Finance">Finance</SelectItem>
                                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                                        <SelectItem value="Marketing">Marketing</SelectItem>
                                        <SelectItem value="Consulting">Consulting</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Experience Level</Label>
                                <Select value={profile.experience}>
                                    <SelectTrigger>
                                        <SelectValue />
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
                                value={profile.bio}
                                onChange={(e) =>
                                    console.log({
                                        ...profile,
                                        bio: e.target.value,
                                    })
                                }
                                rows={4}
                                placeholder="Tell us about your professional background and expertise..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Target Audience</Label>
                            <Input
                                value={profile.targetAudience}
                                onChange={(e) =>
                                    console.log({
                                        ...profile,
                                        targetAudience: e.target.value,
                                    })
                                }
                                placeholder="e.g., Product Managers, Entrepreneurs, Tech Leaders"
                            />
                        </div>
                        {/* 
                        <div className="space-y-3">
                            <Label>Content Focus Areas</Label>
                            <div className="flex flex-wrap gap-2">
                                {profile.contentFocus.map((focus, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {focus}
                                        <span className="ml-1 cursor-pointer">×</span>
                                    </Badge>
                                ))}
                                <AddFocusAreaDialog
                                    currentFocusAreas={profile.contentFocus}
                                    onAddFocusArea={() => {}}
                                />
                            </div>
                        </div> */}
                    </CardContent>
                </Card>
                <RegionalSettingsSection />
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
