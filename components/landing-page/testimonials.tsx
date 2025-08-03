import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "VP of Marketing",
            company: "TechFlow",
            avatar: "/placeholder.svg?height=60&width=60",
            content:
                "Autorly transformed my LinkedIn presence completely. My engagement increased by 300% in just 2 months, and I'm getting inbound leads daily.",
            rating: 5,
        },
        {
            name: "Marcus Rodriguez",
            role: "Startup Founder",
            company: "InnovateLab",
            avatar: "/placeholder.svg?height=60&width=60",
            content:
                "As a busy founder, I don't have time for social media. Autorly handles everything while keeping my authentic voice. It's like having a personal content team.",
            rating: 5,
        },
        {
            name: "Emily Watson",
            role: "Sales Director",
            company: "GrowthCorp",
            avatar: "/placeholder.svg?height=60&width=60",
            content:
                "The AI is incredibly smart. It creates content that actually sounds like me and resonates with my network. My connection requests have tripled.",
            rating: 5,
        },
        {
            name: "David Kim",
            role: "Product Manager",
            company: "DataSync",
            avatar: "/placeholder.svg?height=60&width=60",
            content:
                "I was skeptical about AI-generated content, but Autorly proved me wrong. The posts are engaging, relevant, and drive real business results.",
            rating: 5,
        },
        {
            name: "Lisa Thompson",
            role: "Consultant",
            company: "Strategic Insights",
            avatar: "/placeholder.svg?height=60&width=60",
            content:
                "Autorly helped me establish thought leadership in my industry. The content quality is exceptional and the scheduling is perfect.",
            rating: 5,
        },
        {
            name: "James Wilson",
            role: "CEO",
            company: "FutureTech",
            avatar: "/placeholder.svg?height=60&width=60",
            content:
                "ROI is incredible. The time I save on content creation, I invest in growing my business. Autorly pays for itself many times over.",
            rating: 5,
        },
    ];

    return (
        <section id="testimonials" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        Loved by{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            10,000+ Professionals
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join thousands of professionals who've transformed their LinkedIn presence
                        with Autorly.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 text-yellow-400 fill-current"
                                        />
                                    ))}
                                </div>

                                <Quote className="h-8 w-8 text-blue-200 mb-4" />

                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={testimonial.avatar || "/placeholder.svg"}
                                        />
                                        <AvatarFallback>
                                            {testimonial.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">
                                            {testimonial.role} at {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
