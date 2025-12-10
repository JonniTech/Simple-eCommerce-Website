"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { FiDollarSign, FiShoppingBag, FiUsers, FiBox, FiClock, FiAlertTriangle, FiCheckCircle, FiPackage } from "react-icons/fi";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        pendingOrders: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch stats
            const { data: statsData } = await api.get("/orders/stats");
            setStats(statsData);

            // Fetch recent orders
            const { data: ordersData } = await api.get("/orders");
            const orders = Array.isArray(ordersData) ? ordersData : ordersData.orders || [];
            setRecentOrders(orders.slice(0, 5));

            // Fetch products and filter low stock
            const { data: productsData } = await api.get("/products");
            const products = productsData.products || [];
            setLowStockProducts(products.filter(p => p.stock < 10).slice(0, 5));
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    const getOrderStatus = (order) => {
        if (order.isDelivered) return { icon: FiCheckCircle, text: "Delivered", color: "text-green-500" };
        if (order.isPaid) return { icon: FiPackage, text: "Processing", color: "text-blue-500" };
        return { icon: FiClock, text: "Pending", color: "text-orange-500" };
    };

    return (
        <AdminLayout>
            <div className="mb-8 animate-in slide-in-from-bottom-2">
                <h1 className="text-3xl font-bold text-dark dark:text-white">Dashboard</h1>
                <p className="text-gray-500 mt-2">Store Overview & Real-time Analytics</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-[#362F5C] p-6 rounded-2xl shadow-sm border border-transparent dark:border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <FiDollarSign size={80} />
                            </div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider relative z-10">Total Sales</h3>
                            <p className="text-3xl font-extrabold mt-2 text-primary relative z-10">${stats.totalSales.toLocaleString()}</p>
                        </div>

                        <div className="bg-white dark:bg-[#362F5C] p-6 rounded-2xl shadow-sm border border-transparent dark:border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <FiShoppingBag size={80} />
                            </div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider relative z-10">Total Orders</h3>
                            <p className="text-3xl font-extrabold mt-2 text-dark dark:text-white relative z-10">{stats.totalOrders}</p>
                            {stats.pendingOrders > 0 && <span className="text-xs text-orange-500 font-bold flex items-center gap-1 mt-1"><FiClock /> {stats.pendingOrders} Pending</span>}
                        </div>

                        <div className="bg-white dark:bg-[#362F5C] p-6 rounded-2xl shadow-sm border border-transparent dark:border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <FiUsers size={80} />
                            </div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider relative z-10">Total Users</h3>
                            <p className="text-3xl font-extrabold mt-2 text-dark dark:text-white relative z-10">{stats.totalUsers}</p>
                        </div>

                        <div className="bg-white dark:bg-[#362F5C] p-6 rounded-2xl shadow-sm border border-transparent dark:border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <FiBox size={80} />
                            </div>
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider relative z-10">Total Products</h3>
                            <p className="text-3xl font-extrabold mt-2 text-dark dark:text-white relative z-10">{stats.totalProducts}</p>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Recent Orders */}
                        <div className="lg:col-span-2 bg-white dark:bg-[#362F5C] p-6 rounded-3xl shadow-sm border border-transparent dark:border-white/5">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-dark dark:text-white">Recent Orders</h3>
                                <Link href="/admin/orders" className="text-primary hover:text-primary/80 text-sm font-semibold">
                                    View All →
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {recentOrders.map((order) => {
                                    const status = getOrderStatus(order);
                                    const StatusIcon = status.icon;
                                    return (
                                        <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/20 rounded-xl hover:bg-gray-100 dark:hover:bg-black/30 transition-colors">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="text-xs">
                                                    <p className="font-mono opacity-60">#{order._id.substring(0, 8)}</p>
                                                    <p className="font-medium mt-1">{order.user?.name || "Guest"}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`flex items-center gap-1 text-sm font-medium ${status.color}`}>
                                                    <StatusIcon size={14} /> {status.text}
                                                </span>
                                                <span className="font-bold text-primary">${order.totalPrice?.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                                {recentOrders.length === 0 && (
                                    <p className="text-center py-8 text-gray-500">No recent orders</p>
                                )}
                            </div>
                        </div>

                        {/* Low Stock Alert */}
                        <div className="bg-white dark:bg-[#362F5C] p-6 rounded-3xl shadow-sm border border-transparent dark:border-white/5">
                            <div className="flex items-center gap-2 mb-6">
                                <FiAlertTriangle className="text-orange-500" size={20} />
                                <h3 className="text-xl font-bold text-dark dark:text-white">Low Stock</h3>
                            </div>
                            <div className="space-y-3">
                                {lowStockProducts.map((product) => (
                                    <div key={product._id} className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-200 dark:border-orange-500/20">
                                        <div className="relative w-12 h-12 bg-gray-100 dark:bg-black/20 rounded-lg overflow-hidden flex-shrink-0">
                                            <SafeImage src={product.image} alt={product.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate">{product.name}</p>
                                            <p className="text-xs text-orange-600 dark:text-orange-400 font-bold">Only {product.stock} left</p>
                                        </div>
                                    </div>
                                ))}
                                {lowStockProducts.length === 0 && (
                                    <p className="text-center py-8 text-gray-500 text-sm">All products well stocked!</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions & System Status */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-[#362F5C] p-8 rounded-3xl shadow-sm border border-transparent dark:border-white/5">
                            <h3 className="text-xl font-bold mb-6 text-dark dark:text-white">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/admin/products/new" className="p-4 bg-gray-50 dark:bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all text-center flex flex-col items-center gap-2 group">
                                    <FiBox className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <span className="font-semibold">Add Product</span>
                                </Link>
                                <Link href="/admin/orders" className="p-4 bg-gray-50 dark:bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all text-center flex flex-col items-center gap-2 group">
                                    <FiShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <span className="font-semibold">View Orders</span>
                                </Link>
                                <Link href="/admin/products" className="p-4 bg-gray-50 dark:bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all text-center flex flex-col items-center gap-2 group">
                                    <FiBox className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <span className="font-semibold">Manage Products</span>
                                </Link>
                                <Link href="/admin/users" className="p-4 bg-gray-50 dark:bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all text-center flex flex-col items-center gap-2 group">
                                    <FiUsers className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    <span className="font-semibold">View Users</span>
                                </Link>
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="bg-gradient-to-br from-primary to-[#8272e5] p-8 rounded-3xl shadow-lg text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">System Status</h3>
                                <p className="opacity-90">All systems operational.</p>
                                <p className="mt-4 font-mono text-sm opacity-70">
                                    Version 1.0.0<br />
                                    Server: Online<br />
                                    Database: Connected
                                </p>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
}
