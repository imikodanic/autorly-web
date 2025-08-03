import { ArrowRight, UserPlus, Settings, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorks() {
    const steps = [
        {
            icon: UserPlus,
            title: "Connect Your LinkedIn",
            description:
                "Securely link your LinkedIn account in just one click. We'll analyze your profile and audience.",
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            icon: Settings,
            title: "Customize Your Strategy",
            description:
                "Set your content preferences, posting schedule, and brand voice. Our AI learns your style.",
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            icon: Rocket,
            title: "Watch Your Growth",
            description:
                "Sit back as Autorly creates, schedules, and optimizes your content automatically.",
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
    ];

    return (
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        Get Started in{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            3 Simple Steps
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        From setup to success in under 5 minutes. No technical skills required.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                                <CardContent className="p-8">
                                    <div
                                        className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
                                    >
                                        <step.icon className={`h-8 w-8 ${step.color}`} />
                                    </div>
                                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full border-4 border-blue-600 flex items-center justify-center font-bold text-blue-600">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Arrow between steps */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                    <ArrowRight className="h-8 w-8 text-blue-300" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
