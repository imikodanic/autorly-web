import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function LandingPageCta() {
    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Ready to Put Your LinkedIn{" "}
                        <span className="text-blue-200">On Autopilot?</span>
                    </h2>

                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join professionals who&#39;ve transformed their LinkedIn presence. Start
                        your free trial today and see results in just 7 days.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
                        >
                            <Sparkles className="mr-2 h-5 w-5" />
                            Start Free Trial
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>

                        <div className="text-blue-200 text-sm">
                            No credit card required • 14-day free trial
                        </div>
                    </div>

                    {/*<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">*/}
                    {/*    <div>*/}
                    {/*        <div className="text-3xl font-bold text-blue-200">10,000+</div>*/}
                    {/*        <div className="text-blue-100">Active Users</div>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <div className="text-3xl font-bold text-blue-200">2M+</div>*/}
                    {/*        <div className="text-blue-100">Posts Generated</div>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <div className="text-3xl font-bold text-blue-200">95%</div>*/}
                    {/*        <div className="text-blue-100">Customer Satisfaction</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
}
