import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Ready to Put Your LinkedIn{" "}
                        <span className="text-blue-200">On Autopilot?</span>
                    </h2>

                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join our early access program and be among the first to experience
                        AI-powered LinkedIn automation. Limited beta spots available.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
                        >
                            <Link href="/sign-up">
                                <Sparkles className="mr-2 h-5 w-5" />
                                Join Beta Program
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>

                        <div className="text-blue-200 text-sm">
                            No credit card required • Early access pricing
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-200">Beta</div>
                            <div className="text-blue-100">Early Access Program</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-200">AI-Powered</div>
                            <div className="text-blue-100">Content Generation</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-200">24/7</div>
                            <div className="text-blue-100">Automated Posting</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
