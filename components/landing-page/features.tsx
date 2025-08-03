import { Bot, Calendar, BarChart3, Target, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Features() {
    const features = [
        {
            icon: Bot,
            title: "AI Content Generation",
            description:
                "Advanced AI creates engaging, personalized LinkedIn posts that match your voice and industry expertise.",
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            icon: Calendar,
            title: "Smart Scheduling",
            description:
                "Automatically post at optimal times when your audience is most active for maximum engagement.",
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            icon: BarChart3,
            title: "Performance Analytics",
            description:
                "Track engagement, reach, and growth with detailed analytics and actionable insights.",
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            icon: Target,
            title: "Audience Targeting",
            description:
                "AI analyzes your network to create content that resonates with your specific audience.",
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
        {
            icon: Zap,
            title: "Instant Optimization",
            description:
                "Real-time content optimization based on trending topics and engagement patterns.",
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
        },
        {
            icon: Shield,
            title: "Brand Safety",
            description:
                "Built-in content moderation ensures all posts align with your professional brand.",
            color: "text-red-600",
            bgColor: "bg-red-100",
        },
    ];

    return (
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        Everything You Need to{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Dominate LinkedIn
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Autorly combines cutting-edge AI with deep LinkedIn insights to automate
                        your entire content strategy.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <CardHeader>
                                <div
                                    className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}
                                >
                                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
