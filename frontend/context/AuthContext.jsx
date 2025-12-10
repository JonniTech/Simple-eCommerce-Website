"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api, setToken } from "@/lib/api";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                try {
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                } catch (e) {
                    console.error("Auth Init Error", e);
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post("/auth/login", { email, password });

            if (data.success && data.user) {
                const { token } = data.user;
                setToken(token);
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                return { success: true };
            }
            return { success: false, error: "Invalid response from server" };

        } catch (error) {
            console.error("Login failed", error);
            return { success: false, error: error.response?.data?.message || "Login failed" };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post("/auth/register", { name, email, password });

            if (data.success && data.user) {
                const { token } = data.user;
                setToken(token);
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                return { success: true };
            }
            return { success: false, error: "Invalid response from server" };

        } catch (error) {
            console.error("Registration failed", error);
            return { success: false, error: error.response?.data?.message || "Registration failed" };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
