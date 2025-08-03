import { Linkedin, Twitter, Facebook, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <Image
                                src="/logo-dark.svg"
                                alt="Autorly Logo"
                                width={40}
                                height={40}
                                className="w-30 h-auto"
                            />
                        </Link>
                        <p className="text-gray-400 mb-6">Your Content, On Autopilot.</p>
                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Mail className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    API
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Integrations
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Status
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Community
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">© 2025 Autorly. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
