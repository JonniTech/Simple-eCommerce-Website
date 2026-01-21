"use client";
import Link from "next/link";
import { FiGithub, FiTwitter, FiInstagram, FiMail } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-white/50 dark:bg-[#2D274B]/50 border-t border-gray-300 dark:border-gray-700 backdrop-blur-sm mt-auto">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="font-bold text-xl md:text-2xl flex items-center gap-2 mb-4 group w-fit">
                            <span className="text-primary group-hover:scale-110 transition-transform">Ghost</span>
                            <span className="text-dark dark:text-white">Shop</span>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                            Experience the future of shopping with our premium tech collection. 
                            Quality meets innovation in every product we curate.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-dark dark:text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/cart" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">Cart</Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">Login</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold text-dark dark:text-white mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy-policy" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} GhostShop. All rights reserved.
                    </p>

                    <div className="flex items-center gap-3">
                        <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-110 transform duration-300 shadow-sm" aria-label="Github">
                            <FiGithub className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-[#1DA1F2] hover:text-white transition-all hover:scale-110 transform duration-300 shadow-sm" aria-label="Twitter">
                            <FiTwitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-[#E1306C] hover:text-white transition-all hover:scale-110 transform duration-300 shadow-sm" aria-label="Instagram">
                            <FiInstagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-primary hover:text-white transition-all hover:scale-110 transform duration-300 shadow-sm" aria-label="Email">
                            <FiMail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
