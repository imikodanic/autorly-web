"use client";

import { ArrowRight, Play, Sparkles, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                <Sparkles className="w-3 h-3 mr-1" />
                                AI-Powered Content Automation
                            </Badge>

                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                Your Content,{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    On Autopilot
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Transform your LinkedIn presence with AI that creates, schedules,
                                and optimizes your content automatically. Grow your professional
                                network while you focus on what matters most.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">10x</div>
                                <div className="text-sm text-gray-500">More Engagement</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">5hrs</div>
                                <div className="text-sm text-gray-500">Saved Weekly</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">95%</div>
                                <div className="text-sm text-gray-500">Time Reduction</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-6"
                            >
                                <Link href="/sign-up">
                                    Start for Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                            {/* <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 py-6 border-2 hover:bg-gray-50 bg-transparent"
                            >
                                <Play className="mr-2 h-5 w-5" />
                                Watch Demo
                            </Button> */}
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-gray-600">
                                    No credit card required
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-gray-600">Setup in 2 minutes</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Visual */}
                    <div className="relative">
                        <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 shadow-2xl">
                            {/* Mock Dashboard */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src="/logo-dark.svg"
                                            alt="Autorly"
                                            width={32}
                                            height={32}
                                            className="w-20 h-auto"
                                        />
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold">Content Pipeline</h3>
                                        <Badge className="bg-green-100 text-green-700">
                                            Active
                                        </Badge>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm">
                                                Generating LinkedIn post about AI trends...
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm">
                                                Post scheduled for tomorrow 9:00 AM
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            <span className="text-sm">
                                                Analyzing engagement patterns...
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <div className="text-lg font-bold text-blue-600">
                                                    24
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Posts This Month
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold text-green-600">
                                                    4.8K
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Total Reach
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold text-purple-600">
                                                    12%
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Engagement Rate
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                            <Sparkles className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
                            <Zap className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
