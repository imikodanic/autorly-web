"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate password reset
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6">
                            <Image
                                src="/logo-light.svg"
                                alt="Autorly Logo"
                                width={48}
                                height={48}
                                className="w-12 h-12"
                            />
                            <span className="text-2xl font-bold text-gray-900">Autorly</span>
                        </Link>
                    </div>

                    <Card className="border-0 shadow-xl">
                        <CardHeader className="text-center pb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-8 w-8 text-green-600" />
                            </div>
                            <CardTitle className="text-2xl">Check your email</CardTitle>
                            <CardDescription>
                                We&#39;ve sent a password reset link to <strong>{email}</strong>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="text-center text-sm text-gray-600">
                                <p>Didn&#39;t receive the email? Check your spam folder or</p>
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-blue-600"
                                    onClick={() => setIsSubmitted(false)}
                                >
                                    try another email address
                                </Button>
                            </div>

                            <Link href="/login">
                                <Button variant="outline" className="w-full bg-transparent">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to login
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

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
                            className="w-12 h-12"
                        />
                        <span className="text-2xl font-bold text-gray-900">Autorly</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot password?</h1>
                    <p className="text-gray-600">
                        No worries, we&#39;ll send you reset instructions
                    </p>
                </div>

                <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
                        <CardDescription className="text-center">
                            Enter your email address to receive a reset link
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                size="lg"
                                disabled={isLoading || !email}
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Sending...
                                    </div>
                                ) : (
                                    <>
                                        Send Reset Link
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="text-center pt-4 border-t">
                            <Link
                                href="/login"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                <ArrowLeft className="mr-1 h-4 w-4 inline" />
                                Back to login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
