import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                    <p className="text-gray-600">Last updated: January 2025</p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            1. Information We Collect
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                At Autorly, we collect information you provide directly to us, such
                                as when you create an account, connect your LinkedIn profile, or use
                                our AI-powered content generation services.
                            </p>
                            <h3 className="text-lg font-medium text-gray-900">
                                Personal Information:
                            </h3>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Name, email address, and profile information</li>
                                <li>LinkedIn account data (when you connect your account)</li>
                                <li>Content preferences and posting history</li>
                                <li>Usage data and analytics</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            2. How We Use Your Information
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide and improve our AI content generation services</li>
                                <li>Schedule and publish posts to your LinkedIn account</li>
                                <li>Analyze your content performance and provide insights</li>
                                <li>Send you service updates and marketing communications</li>
                                <li>Ensure the security and integrity of our platform</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            3. LinkedIn Integration
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                When you connect your LinkedIn account, we access your profile
                                information and posting capabilities through LinkedIn&apos;s
                                official API. We only post content with your explicit permission and
                                never access private messages or sensitive account data.
                            </p>
                            <p>
                                You can disconnect your LinkedIn account at any time from your
                                profile settings, which will immediately revoke our access to your
                                LinkedIn data.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            4. Data Security
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                We implement industry-standard security measures to protect your
                                personal information, including encryption, secure data
                                transmission, and regular security audits. However, no method of
                                transmission over the internet is 100% secure.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            5. Data Sharing
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                We do not sell, trade, or otherwise transfer your personal
                                information to third parties without your consent, except as
                                described in this policy. We may share information with:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Service providers who assist in our operations</li>
                                <li>Legal authorities when required by law</li>
                                <li>Business partners with your explicit consent</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            6. Your Rights
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Access and update your personal information</li>
                                <li>Delete your account and associated data</li>
                                <li>Opt out of marketing communications</li>
                                <li>Request a copy of your data</li>
                                <li>Disconnect third-party integrations</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                If you have any questions about this Privacy Policy, please contact
                                us at:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p>
                                    <strong>Email:</strong> privacy@autorly.com
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
