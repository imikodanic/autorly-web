import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
                    <p className="text-gray-600">Last updated: January 2025</p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                By accessing and using Autorly&apos;s services, you accept and agree
                                to be bound by the terms and provision of this agreement. If you do
                                not agree to abide by the above, please do not use this service.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            2. Service Description
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                Autorly is an AI-powered LinkedIn content automation platform that
                                helps users generate, schedule, and publish professional content to
                                their LinkedIn profiles. Our services include:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>AI-generated content creation</li>
                                <li>Post scheduling and automation</li>
                                <li>Performance analytics and insights</li>
                                <li>LinkedIn account integration</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            3. User Responsibilities
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>As a user of Autorly, you agree to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>
                                    Provide accurate and complete information when creating your
                                    account
                                </li>
                                <li>Maintain the security of your account credentials</li>
                                <li>
                                    Use the service in compliance with LinkedIn&apos;s terms of
                                    service
                                </li>
                                <li>
                                    Not use the service for spam, harassment, or illegal activities
                                </li>
                                <li>Review and approve all content before publication</li>
                                <li>Respect intellectual property rights of others</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            4. LinkedIn Integration
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                Our service integrates with LinkedIn through their official API. By
                                connecting your LinkedIn account, you authorize us to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Access your basic profile information</li>
                                <li>Post content on your behalf (with your explicit approval)</li>
                                <li>Retrieve engagement metrics for your posts</li>
                            </ul>
                            <p>
                                You remain fully responsible for all content posted to your LinkedIn
                                account through our service. We recommend reviewing all generated
                                content before publication.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            5. Content and Intellectual Property
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                You retain ownership of any content you create or provide to our
                                service. By using Autorly, you grant us a limited license to
                                process, analyze, and improve your content for the purpose of
                                providing our services.
                            </p>
                            <p>
                                AI-generated content is provided as-is, and you are responsible for
                                reviewing, editing, and approving all content before publication. We
                                do not guarantee the accuracy, completeness, or appropriateness of
                                AI-generated content.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            6. Subscription and Billing
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                Autorly offers various subscription plans with different features
                                and usage limits. By subscribing, you agree to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Pay all fees associated with your chosen plan</li>
                                <li>Automatic renewal unless cancelled</li>
                                <li>Usage limits as specified in your plan</li>
                                <li>Price changes with 30 days notice</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            7. Service Availability
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                While we strive to maintain high service availability, we do not
                                guarantee uninterrupted access to our platform. We may temporarily
                                suspend service for maintenance, updates, or due to circumstances
                                beyond our control.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            8. Limitation of Liability
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                Autorly shall not be liable for any indirect, incidental, special,
                                consequential, or punitive damages, including without limitation,
                                loss of profits, data, use, goodwill, or other intangible losses,
                                resulting from your use of the service.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            9. Termination
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                Either party may terminate this agreement at any time. Upon
                                termination, your access to the service will cease, and we may
                                delete your account data in accordance with our data retention
                                policy.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            10. Contact Information
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>For questions about these Terms of Service, please contact us at:</p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p>
                                    <strong>Email:</strong> legal@autorly.com
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
