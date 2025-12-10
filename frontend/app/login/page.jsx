"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiLogIn, FiMail, FiLock, FiAlertCircle } from "react-icons/fi";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const res = await login(email, password);
        if (res.success) {
            router.push("/");
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="flex min-h-[85vh] pt-20 items-center justify-center p-4 bg-background dark:bg-dark">
            <div className="w-full max-w-md bg-white dark:bg-[#362F5C] p-8 md:p-10 rounded-3xl shadow-xl border border-white/20 dark:border-white/5 animate-in zoom-in duration-300">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-primary animate-pulse-slow">
                        <FiLogIn size={28} />
                    </div>
                    <h2 className="text-3xl font-bold text-dark dark:text-white">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to your account</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
                        <FiAlertCircle />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-dark dark:text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field pl-10"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-dark dark:text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field pl-10"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary w-full py-4 text-lg">
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-primary font-bold hover:underline">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}
