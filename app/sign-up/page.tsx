"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { signup } from "@/app/sign-up/actions";
import { createClient } from "@/utils/supabase/client";

export default function SignUpPage() {
    const supabase = createClient();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        agreeToTerms: false,
    });
    const [isLoading] = useState(false);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const isFormValid = formData.email && formData.password && formData.agreeToTerms;

    const handleGoogle = async () => {
        const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard`;
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo,
                queryParams: {
                    access_type: "offline", // try to obtain a refresh_token
                    prompt: "consent", // forces consent screen for refresh_token on subsequent logins
                },
            },
        });
        if (error) {
            // show a toast or inline error
            console.error(error.message);
        }
    };

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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
                    <p className="text-gray-600">Join professionals automating their LinkedIn</p>
                </div>

                <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
                        <CardDescription className="text-center">
                            Get started with your free account today
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Social Signup */}
                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                className="w-full h-12 bg-transparent"
                                size="lg"
                                onClick={handleGoogle}
                            >
                                <Image
                                    src="/icons/google-logo.jpg"
                                    alt="Google"
                                    width={20}
                                    height={20}
                                />
                                Continue with Google
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-muted-foreground">
                                    Or continue with email
                                </span>
                            </div>
                        </div>

                        {/* Signup Form */}
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="john@company.com"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    required
                                    className="h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            handleInputChange("password", e.target.value)
                                        }
                                        required
                                        className="h-12 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-400" />
                                        )}
                                    </Button>
                                </div>
                                <div className="text-xs text-gray-500 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Check
                                            className={`h-3 w-3 ${formData.password.length >= 8 ? "text-green-500" : "text-gray-300"}`}
                                        />
                                        <span>At least 8 characters</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check
                                            className={`h-3 w-3 ${
                                                /[A-Z]/.test(formData.password) &&
                                                /[a-z]/.test(formData.password)
                                                    ? "text-green-500"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                        <span>Upper and lowercase letters</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check
                                            className={`h-3 w-3 ${/\d/.test(formData.password) ? "text-green-500" : "text-gray-300"}`}
                                        />
                                        <span>At least one number</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={formData.agreeToTerms}
                                    onCheckedChange={(checked) =>
                                        handleInputChange("agreeToTerms", checked as boolean)
                                    }
                                />
                                <Label
                                    htmlFor="terms"
                                    className="text-sm text-gray-600 leading-relaxed"
                                >
                                    I agree to the{" "}
                                    <Link
                                        href="/terms-of-service"
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy-policy"
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Privacy Policy
                                    </Link>
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                size="lg"
                                disabled={!isFormValid || isLoading}
                                formAction={signup}
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Creating account...
                                    </div>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Sign In Link */}
                        <div className="text-center pt-4 border-t">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Features */}
                <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>14-day free trial, no credit card required</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>AI-powered content generation</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Automated LinkedIn posting</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
