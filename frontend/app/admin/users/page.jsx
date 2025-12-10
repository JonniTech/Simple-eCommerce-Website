"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { FiTrash2, FiShield, FiUser, FiMail, FiCalendar } from "react-icons/fi";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get("/users");
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter(u => u._id !== id));
        } catch (error) {
            alert("Failed to delete user");
        }
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark dark:text-white">User Management</h1>
                <p className="text-gray-500 mt-1">Total Users: {users.length}</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-40 bg-gray-100 dark:bg-white/5 rounded-3xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {users.map((user) => (
                        <div key={user._id} className="bg-white dark:bg-[#362F5C] p-6 rounded-3xl shadow-sm border border-transparent dark:border-white/5 flex flex-col justify-between group hover:border-primary/20 transition-all">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-inner ${user.isAdmin ? "bg-primary text-white" : "bg-gray-100 dark:bg-white/10 text-gray-500"
                                        }`}>
                                        {user.isAdmin ? <FiShield /> : <FiUser />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-dark dark:text-white">{user.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <FiMail className="w-4 h-4" />
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                                {user.isAdmin && (
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Admin
                                    </span>
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                                <div className="text-xs text-gray-400 flex items-center gap-2">
                                    <FiCalendar />
                                    <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>

                                {!user.isAdmin && (
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-all text-sm font-medium flex items-center gap-2"
                                        title="Delete User"
                                    >
                                        <FiTrash2 /> Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
