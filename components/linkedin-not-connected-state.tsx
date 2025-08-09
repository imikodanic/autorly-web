import { Linkedin, ArrowRight, CheckCircle, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLinkedinAuthURL } from "@/utils/linkedin/get-auth-url";
import Link from "next/link";

export function LinkedInNotConnectedState() {
    const benefits = [
        {
            icon: Zap,
            title: "Auto-Publishing",
            description: "Schedule and publish posts automatically",
        },
        {
            icon: BarChart3,
            title: "Performance Analytics",
            description: "Track engagement and optimize your content",
        },
        {
            icon: CheckCircle,
            title: "AI Content Generation",
            description: "Create personalized posts based on your audience",
        },
    ];

    const steps = [
        "Click 'Connect LinkedIn Account'",
        "Authorize Autorly to access your LinkedIn",
        "Start creating and scheduling content",
    ];

    return (
        <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* Main Icon and Title */}
                <div className="space-y-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <Linkedin className="h-10 w-10 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Connect Your LinkedIn Account
                        </h1>
                        <p className="text-lg text-gray-600 max-w-lg mx-auto">
                            Get started by connecting your LinkedIn account to unlock AI-powered
                            content creation and automation.
                        </p>
                    </div>
                    <Button
                        asChild
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
                    >
                        <Link href={getLinkedinAuthURL()}>
                            <Linkedin className="mr-2 h-5 w-5" />
                            Connect LinkedIn Account
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <Card key={index} className="border-0 shadow-sm bg-gray-50">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <benefit.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-sm text-gray-600">{benefit.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* How it Works */}
                <div className="bg-blue-50 rounded-2xl p-8">
                    <h2 className="text-xl font-semibold mb-6">How it works</h2>
                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                    {index + 1}
                                </div>
                                <p className="text-gray-700">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Secure OAuth connection</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>No posting without permission</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Disconnect anytime</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
