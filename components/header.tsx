"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useMe } from "@/lib/api/me/hook";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data: me } = useMe();

    return (
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo-light.svg"
                            alt="Autorly Logo"
                            width={40}
                            height={40}
                            className="w-30 h-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="#features"
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            How it Works
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            Pricing
                        </Link>
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        {!me?.id && (
                            <Button asChild variant="ghost" className="text-gray-600">
                                <Link href="/login">Login</Link>
                            </Button>
                        )}

                        <Button
                            asChild
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        >
                            <Link href={me?.id ? "/dashboard" : "/sign-up"}>
                                {me?.id ? "View Dashboard" : "Start for Free"}
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
                        <nav className="flex flex-col gap-4 mt-4">
                            <Link
                                href="#features"
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                Features
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                How it Works
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                Pricing
                            </Link>
                            <div className="flex flex-col gap-2 mt-4">
                                <Button variant="outline" className="w-full bg-transparent">
                                    Login
                                </Button>
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                                    Start Free Trial
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
