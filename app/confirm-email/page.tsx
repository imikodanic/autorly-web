"use client";

import { useState, useEffect, Suspense } from "react";
import { Mail, CheckCircle, RefreshCw, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function DynamicEmail() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "";
    return <strong className="text-gray-900">{email}</strong>;
}

export default function ConfirmEmailPage() {
    const [isResending, setIsResending] = useState(false);
    const [resendCount, setResendCount] = useState(0);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleResendEmail = async () => {
        setIsResending(true);
        // Simulate resend
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsResending(false);
        setResendCount(resendCount + 1);
        setCountdown(60); // 60 second cooldown
    };

    const canResend = countdown === 0 && resendCount < 3;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 mb-6">
                        <Image
                            src="/logo-light.svg"
                            alt="Autorly Logo"
                            width={48}
                            height={48}
                            className="w-30 h-auto"
                        />
                    </Link>
                </div>

                <Card className="border-0 shadow-xl">
                    <CardHeader className="text-center pb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="h-8 w-8 text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl">Check your email</CardTitle>
                        <CardDescription className="text-base">
                            We&#39;ve sent a confirmation link to <br />
                            <Suspense>
                                <DynamicEmail />
                            </Suspense>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Next Steps
                            </h3>
                            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                                <li>Check your email inbox</li>
                                <li>Click the confirmation link</li>
                                <li>Complete your account setup</li>
                            </ol>
                        </div>

                        {/* Resend Section */}
                        <div className="text-center space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Didn&#39;t receive the email? Check your spam folder or resend it.
                            </p>

                            {countdown > 0 ? (
                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>Resend available in {countdown}s</span>
                                </div>
                            ) : (
                                <Button
                                    onClick={handleResendEmail}
                                    disabled={!canResend || isResending}
                                    variant="outline"
                                    className="bg-transparent"
                                >
                                    {isResending ? (
                                        <>
                                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Resend Email
                                        </>
                                    )}
                                </Button>
                            )}

                            {resendCount > 0 && (
                                <p className="text-xs text-green-600">
                                    ✓ Email sent {resendCount} time{resendCount > 1 ? "s" : ""}
                                </p>
                            )}

                            {resendCount >= 3 && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                    <p className="text-sm text-yellow-800">
                                        <strong>Need help?</strong> Contact our support team if
                                        you&#39;re still having trouble.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Alternative Actions */}
                        <div className="space-y-3 pt-4 border-t">
                            <Button variant="outline" className="w-full bg-transparent" asChild>
                                <Link href="/signup">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Try a different email
                                </Link>
                            </Button>

                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">
                                    Already confirmed?{" "}
                                    <Link
                                        href="/login"
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Login to your account
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Help Section */}
                <div className="mt-8 text-center">
                    <div className="bg-white rounded-lg border p-4 space-y-3">
                        <h4 className="font-semibold text-gray-900">Still need help?</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="font-medium text-gray-700">Check spam folder</p>
                                <p className="text-gray-500">Look in junk/spam</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-700">Email filters</p>
                                <p className="text-gray-500">Check email rules</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-700">Whitelist sender</p>
                                <p className="text-gray-500">Add noreply@autorly.com</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-700">Contact support</p>
                                <p className="text-gray-500">
                                    <Link
                                        href="mailto:support@autorly.com"
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Get help
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>
                        By confirming your email, you agree to our{" "}
                        <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
