"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 dark:bg-[#2D274B]/90 backdrop-blur-md shadow-md py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="font-bold text-3xl flex items-center gap-2 group">
                    <span className="text-primary group-hover:scale-110 transition-transform animate-pulse-slow">Ghost</span>
                    <span className="text-dark dark:text-white">Shop</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="font-bold text-dark dark:text-white hover:text-primary transition-colors relative group">
                        Home
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </Link>

                    {user && user.isAdmin && (
                        <Link href="/admin" className="font-bold text-primary hover:text-[#8272e5] transition-colors relative group">
                            Dashboard
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    )}

                    <div className="flex items-center gap-6 border-l border-gray-300 dark:border-gray-600 pl-6">
                        <Link href="/cart" className="flex items-center gap-2 relative hover:text-primary transition-colors text-dark dark:text-white">
                            <FiShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-6 text-dark dark:text-white">
                                <span className="text-md font-bold opacity-80">Hi, {user.name?.split(' ')[0]}</span>
                                <button
                                    onClick={logout}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                                    title="Logout"
                                >
                                    <FiLogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="btn-primary flex items-center gap-2">
                                <FiUser className="w-4 h-4" />
                                <span>Login</span>
                            </Link>
                        )}

                        <button
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-dark dark:text-white"
                            title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                        >
                            {resolvedTheme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-dark dark:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#2D274B] shadow-lg py-6 px-6 flex flex-col gap-4 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-2">
                    <Link href="/" className="text-lg font-medium text-dark dark:text-white hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                        Home
                    </Link>

                    {user && user.isAdmin && (
                        <Link href="/admin" className="text-lg font-medium text-primary hover:text-[#8272e5]" onClick={() => setIsMobileMenuOpen(false)}>
                            Dashboard
                        </Link>
                    )}

                    <Link href="/cart" className="text-lg font-medium text-dark dark:text-white flex justify-between items-center hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                        Cart
                        <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>
                    </Link>

                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

                    {user ? (
                        <div className="flex justify-between gap-4 items-center">
                            <span className="font-bold text-dark dark:text-white">Hi, {user.name}</span>
                            <button onClick={logout} className="text-red-400 flex items-center gap-2">
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="btn-primary w-full justify-center flex" onClick={() => setIsMobileMenuOpen(false)}>
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
