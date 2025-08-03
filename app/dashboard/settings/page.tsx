"use client";

import { useState } from "react";
import { Save, User, Bell, CreditCard, Shield, Linkedin, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState({
        // Profile Settings
        firstName: "Alex",
        lastName: "Johnson",
        email: "alex.johnson@example.com",
        company: "TechCorp",
        jobTitle: "Senior Product Manager",
        bio: "Passionate about building products that solve real problems. 5+ years in SaaS, currently leading product at TechCorp.",
        timezone: "America/New_York",
        language: "en",

        // LinkedIn Settings
        linkedinConnected: true,
        autoPost: true,
        postingFrequency: 4,
        optimalTiming: true,

        // AI Content Settings
        contentTone: "professional",
        useEmojis: true,
        includeHashtags: true,
        contentLength: "medium",
        aiCreativity: [7],

        // Notification Settings
        emailNotifications: true,
        postReminders: true,
        weeklyReports: true,
        securityAlerts: true,
        marketingEmails: false,

        // Privacy Settings
        profileVisibility: "public",
        dataSharing: false,
        analyticsTracking: true,
    });

    const handleSave = async () => {
        setIsLoading(true);
        // Simulate save
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    const updateSetting = (key: string, value: unknown) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your account preferences and application settings
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                        </div>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </>
                    )}
                </Button>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="linkedin" className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                    </TabsTrigger>
                    <TabsTrigger value="ai" className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        AI Content
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Billing
                    </TabsTrigger>
                    <TabsTrigger value="privacy" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Privacy
                    </TabsTrigger>
                </TabsList>

                {/* Profile Settings */}
                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your personal information and preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Profile Picture */}
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                                    <AvatarFallback className="text-lg">AJ</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Button variant="outline" className="bg-transparent">
                                        Change Photo
                                    </Button>
                                    <p className="text-sm text-muted-foreground">
                                        JPG, PNG or GIF. Max size 2MB.
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            {/* Basic Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={settings.firstName}
                                        onChange={(e) => updateSetting("firstName", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={settings.lastName}
                                        onChange={(e) => updateSetting("lastName", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => updateSetting("email", e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        value={settings.company}
                                        onChange={(e) => updateSetting("company", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="jobTitle">Job Title</Label>
                                    <Input
                                        id="jobTitle"
                                        value={settings.jobTitle}
                                        onChange={(e) => updateSetting("jobTitle", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    rows={4}
                                    value={settings.bio}
                                    onChange={(e) => updateSetting("bio", e.target.value)}
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select
                                        value={settings.timezone}
                                        onValueChange={(value) => updateSetting("timezone", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="America/New_York">
                                                Eastern Time (ET)
                                            </SelectItem>
                                            <SelectItem value="America/Chicago">
                                                Central Time (CT)
                                            </SelectItem>
                                            <SelectItem value="America/Denver">
                                                Mountain Time (MT)
                                            </SelectItem>
                                            <SelectItem value="America/Los_Angeles">
                                                Pacific Time (PT)
                                            </SelectItem>
                                            <SelectItem value="Europe/London">
                                                London (GMT)
                                            </SelectItem>
                                            <SelectItem value="Europe/Paris">
                                                Paris (CET)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Select
                                        value={settings.language}
                                        onValueChange={(value) => updateSetting("language", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                            <SelectItem value="de">German</SelectItem>
                                            <SelectItem value="it">Italian</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Password Change */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>
                                Update your password to keep your account secure
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input id="newPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input id="confirmPassword" type="password" />
                            </div>
                            <Button variant="outline" className="bg-transparent">
                                Update Password
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* LinkedIn Settings */}
                <TabsContent value="linkedin" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Linkedin className="h-5 w-5 text-blue-600" />
                                LinkedIn Integration
                            </CardTitle>
                            <CardDescription>
                                Manage your LinkedIn connection and posting preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Connection Status */}
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                                    <div>
                                        <p className="font-medium">LinkedIn Connected</p>
                                        <p className="text-sm text-muted-foreground">
                                            Connected as Alex Johnson
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="bg-transparent">
                                        View Profile
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700 bg-transparent"
                                    >
                                        Disconnect
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            {/* Posting Settings */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-base font-medium">
                                            Auto-posting
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Automatically publish scheduled posts
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.autoPost}
                                        onCheckedChange={(checked) =>
                                            updateSetting("autoPost", checked)
                                        }
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-base font-medium">
                                        Weekly Posting Frequency
                                    </Label>
                                    <div className="space-y-2">
                                        <Slider
                                            value={[settings.postingFrequency]}
                                            onValueChange={(value) =>
                                                updateSetting("postingFrequency", value[0])
                                            }
                                            max={10}
                                            min={1}
                                            step={1}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>1 post/week</span>
                                            <span className="font-medium">
                                                {settings.postingFrequency} posts/week
                                            </span>
                                            <span>10 posts/week</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-base font-medium">
                                            Optimal Timing
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            AI determines the best times to post
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.optimalTiming}
                                        onCheckedChange={(checked) =>
                                            updateSetting("optimalTiming", checked)
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Posting Schedule */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Posting Schedule</CardTitle>
                            <CardDescription>
                                Set your preferred posting times for each day
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday",
                                    "Sunday",
                                ].map((day) => (
                                    <div key={day} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Switch
                                                defaultChecked={
                                                    day !== "Saturday" && day !== "Sunday"
                                                }
                                            />
                                            <Label className="font-medium">{day}</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="time"
                                                defaultValue="09:00"
                                                className="w-24"
                                            />
                                            <span className="text-muted-foreground">to</span>
                                            <Input
                                                type="time"
                                                defaultValue="17:00"
                                                className="w-24"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* AI Content Settings */}
                <TabsContent value="ai" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bot className="h-5 w-5 text-purple-600" />
                                AI Content Generation
                            </CardTitle>
                            <CardDescription>
                                Customize how AI creates content for your posts
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="contentTone">Content Tone</Label>
                                <Select
                                    value={settings.contentTone}
                                    onValueChange={(value) => updateSetting("contentTone", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="professional">Professional</SelectItem>
                                        <SelectItem value="casual">Casual</SelectItem>
                                        <SelectItem value="friendly">Friendly</SelectItem>
                                        <SelectItem value="authoritative">Authoritative</SelectItem>
                                        <SelectItem value="inspiring">Inspiring</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contentLength">Content Length</Label>
                                <Select
                                    value={settings.contentLength}
                                    onValueChange={(value) => updateSetting("contentLength", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="short">Short (50-100 words)</SelectItem>
                                        <SelectItem value="medium">
                                            Medium (100-200 words)
                                        </SelectItem>
                                        <SelectItem value="long">Long (200+ words)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-base font-medium">AI Creativity Level</Label>
                                <div className="space-y-2">
                                    <Slider
                                        value={settings.aiCreativity}
                                        onValueChange={(value) =>
                                            updateSetting("aiCreativity", value)
                                        }
                                        max={10}
                                        min={1}
                                        step={1}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Conservative</span>
                                        <span className="font-medium">
                                            Level {settings.aiCreativity[0]}
                                        </span>
                                        <span>Creative</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-base font-medium">Use Emojis</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Include relevant emojis in posts
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.useEmojis}
                                        onCheckedChange={(checked) =>
                                            updateSetting("useEmojis", checked)
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-base font-medium">
                                            Include Hashtags
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Add relevant hashtags to posts
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.includeHashtags}
                                        onCheckedChange={(checked) =>
                                            updateSetting("includeHashtags", checked)
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Content Topics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Content Topics</CardTitle>
                            <CardDescription>
                                Select topics you want AI to focus on when creating content
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    "Product Management",
                                    "AI & Technology",
                                    "Startup Insights",
                                    "Leadership",
                                    "Marketing",
                                    "Sales",
                                    "Customer Success",
                                    "Data Analytics",
                                    "Industry Trends",
                                    "Team Building",
                                    "Innovation",
                                    "Career Growth",
                                ].map((topic) => (
                                    <div key={topic} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={topic}
                                            defaultChecked={Math.random() > 0.5}
                                        />
                                        <Label htmlFor={topic} className="text-sm">
                                            {topic}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-orange-600" />
                                Email Notifications
                            </CardTitle>
                            <CardDescription>
                                Choose what email notifications you want to receive
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">
                                        Email Notifications
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive email notifications
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.emailNotifications}
                                    onCheckedChange={(checked) =>
                                        updateSetting("emailNotifications", checked)
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">Post Reminders</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Reminders about scheduled posts
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.postReminders}
                                    onCheckedChange={(checked) =>
                                        updateSetting("postReminders", checked)
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">Weekly Reports</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Weekly performance summaries
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.weeklyReports}
                                    onCheckedChange={(checked) =>
                                        updateSetting("weeklyReports", checked)
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">Security Alerts</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Important security notifications
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.securityAlerts}
                                    onCheckedChange={(checked) =>
                                        updateSetting("securityAlerts", checked)
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">
                                        Marketing Emails
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Product updates and tips
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.marketingEmails}
                                    onCheckedChange={(checked) =>
                                        updateSetting("marketingEmails", checked)
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Push Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Push Notifications</CardTitle>
                            <CardDescription>
                                Manage browser and mobile push notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">
                                        Browser Notifications
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Show notifications in your browser
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">
                                        Mobile Notifications
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Push notifications to your mobile device
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Billing */}
                <TabsContent value="billing" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-green-600" />
                                Current Plan
                            </CardTitle>
                            <CardDescription>
                                Manage your subscription and billing information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div>
                                    <h3 className="font-semibold text-blue-900">
                                        Professional Plan
                                    </h3>
                                    <p className="text-sm text-blue-700">
                                        $49/month • Billed monthly
                                    </p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        Next billing date: February 15, 2024
                                    </p>
                                </div>
                                <Badge className="bg-blue-600">Active</Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <div className="text-2xl font-bold">42</div>
                                    <div className="text-sm text-muted-foreground">
                                        Posts this month
                                    </div>
                                    <div className="text-xs text-green-600">8 remaining</div>
                                </div>
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <div className="text-2xl font-bold">∞</div>
                                    <div className="text-sm text-muted-foreground">Analytics</div>
                                    <div className="text-xs text-green-600">Unlimited</div>
                                </div>
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <div className="text-2xl font-bold">✓</div>
                                    <div className="text-sm text-muted-foreground">
                                        Priority Support
                                    </div>
                                    <div className="text-xs text-green-600">Included</div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="bg-transparent">
                                    Change Plan
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700 bg-transparent"
                                >
                                    Cancel Subscription
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Method */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                            <CardDescription>Manage your payment information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                        VISA
                                    </div>
                                    <div>
                                        <p className="font-medium">•••• •••• •••• 4242</p>
                                        <p className="text-sm text-muted-foreground">
                                            Expires 12/26
                                        </p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="bg-transparent">
                                    Update
                                </Button>
                            </div>

                            <Button variant="outline" className="bg-transparent">
                                Add Payment Method
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Billing History */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing History</CardTitle>
                            <CardDescription>View your past invoices and payments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { date: "Jan 15, 2024", amount: "$49.00", status: "Paid" },
                                    { date: "Dec 15, 2023", amount: "$49.00", status: "Paid" },
                                    { date: "Nov 15, 2023", amount: "$49.00", status: "Paid" },
                                ].map((invoice, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium">{invoice.date}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Professional Plan
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{invoice.amount}</p>
                                            <Badge variant="secondary" className="text-xs">
                                                {invoice.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Privacy & Security */}
                <TabsContent value="privacy" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-red-600" />
                                Privacy Settings
                            </CardTitle>
                            <CardDescription>
                                Control your privacy and data sharing preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                                <Select
                                    value={settings.profileVisibility}
                                    onValueChange={(value) =>
                                        updateSetting("profileVisibility", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                        <SelectItem value="connections">
                                            Connections Only
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">Data Sharing</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Share anonymized data to improve AI
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.dataSharing}
                                    onCheckedChange={(checked) =>
                                        updateSetting("dataSharing", checked)
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">
                                        Analytics Tracking
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Allow usage analytics for better experience
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.analyticsTracking}
                                    onCheckedChange={(checked) =>
                                        updateSetting("analyticsTracking", checked)
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Manage your account security settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">
                                        Two-Factor Authentication
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Add an extra layer of security
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" className="bg-transparent">
                                    Enable
                                </Button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">
                                        Login Notifications
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified of new logins
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label className="text-base font-medium">Active Sessions</Label>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Current Session</p>
                                            <p className="text-sm text-muted-foreground">
                                                Chrome on macOS • New York, NY
                                            </p>
                                        </div>
                                        <Badge variant="secondary">Active</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Export */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Management</CardTitle>
                            <CardDescription>Export or delete your account data</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium">Export Data</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Download all your account data
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" className="bg-transparent">
                                    Export
                                </Button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-medium text-red-600">
                                        Delete Account
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Permanently delete your account and data
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 bg-transparent"
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
