"use client";

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
                            <Select value={"United States"}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="United States">United States</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    <SelectItem value="Germany">Germany</SelectItem>
                                    <SelectItem value="France">France</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                    <SelectItem value="Japan">Japan</SelectItem>
                                    <SelectItem value="India">India</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm">Timezone</Label>
                            <Select value={"America/Los_Angeles"}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="America/Los_Angeles">
                                        Pacific Time (PT)
                                    </SelectItem>
                                    <SelectItem value="America/Denver">
                                        Mountain Time (MT)
                                    </SelectItem>
                                    <SelectItem value="America/Chicago">
                                        Central Time (CT)
                                    </SelectItem>
                                    <SelectItem value="America/New_York">
                                        Eastern Time (ET)
                                    </SelectItem>
                                    <SelectItem value="Europe/London">
                                        Greenwich Mean Time (GMT)
                                    </SelectItem>
                                    <SelectItem value="Europe/Paris">
                                        Central European Time (CET)
                                    </SelectItem>
                                    <SelectItem value="Asia/Tokyo">
                                        Japan Standard Time (JST)
                                    </SelectItem>
                                    <SelectItem value="Australia/Sydney">
                                        Australian Eastern Time (AET)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm">Language</Label>
                            <Select value={"English (US)"}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="English (US)">English (US)</SelectItem>
                                    <SelectItem value="English (UK)">English (UK)</SelectItem>
                                    <SelectItem value="Spanish">Spanish</SelectItem>
                                    <SelectItem value="French">French</SelectItem>
                                    <SelectItem value="German">German</SelectItem>
                                    <SelectItem value="Japanese">Japanese</SelectItem>
                                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                                </SelectContent>
                            </Select>
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
