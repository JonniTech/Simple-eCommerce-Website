"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiGrid, FiBox, FiUsers, FiLogOut, FiMenu, FiX, FiShoppingBag } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Protect admin routes - redirect based on user status
    useEffect(() => {
        if (!loading && !isRedirecting) {
            if (!user) {
                // No user logged in - redirect to login
                setIsRedirecting(true);
                router.push("/login");
            } else if (!user.isAdmin) {
                // User logged in but not admin - redirect to 404
                setIsRedirecting(true);
                router.push("/404");
            }
        }
    }, [user, loading, router, isRedirecting]);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#252040]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Don't render admin content for non-admin users
    if (!user || !user.isAdmin) {
        return null;
    }

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: FiGrid },
        { name: "Products", href: "/admin/products", icon: FiBox },
        { name: "Orders", href: "/admin/orders", icon: FiShoppingBag },
        { name: "Users", href: "/admin/users", icon: FiUsers },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#252040] flex pt-20">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#2D274B] border-r border-gray-200 dark:border-white/5 fixed h-[calc(100vh-80px)] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Menu</h2>
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                                        }`}
                                >
                                    <Icon size={20} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="mt-auto p-6 border-t border-gray-200 dark:border-white/5">
                    <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl w-full transition-colors">
                        <FiLogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-xl z-50 hover:scale-110 transition-transform"
            >
                {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <aside className="md:hidden fixed inset-0 z-40 bg-white dark:bg-[#2D274B] pt-24 px-6 flex flex-col animate-in slide-in-from-right duration-300">
                    <nav className="space-y-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-medium ${isActive ? "bg-primary text-white" : "text-gray-600 dark:text-white"
                                        }`}
                                >
                                    <Icon size={24} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 md:p-10 overflow-x-hidden">
                <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
