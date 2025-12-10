"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { FiClock, FiCheckCircle, FiPackage, FiChevronDown, FiChevronUp, FiUser, FiMail, FiDollarSign } from "react-icons/fi";
import SafeImage from "@/components/SafeImage";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get("/orders");
            setOrders(Array.isArray(data) ? data : data.orders || []);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const handleStatusUpdate = async (orderId, field, value) => {
        try {
            const { data } = await api.put(`/orders/${orderId}/status`, { [field]: value });
            // Update local state
            setOrders(orders.map(o => o._id === orderId ? data.order : o));
        } catch (error) {
            alert("Failed to update order status");
        }
    };

    const getStatusBadge = (order) => {
        if (order.isDelivered) {
            return <span className="flex items-center gap-2 text-green-500 text-sm font-medium"><FiCheckCircle /> Delivered</span>;
        } else if (order.isPaid) {
            return <span className="flex items-center gap-2 text-blue-500 text-sm font-medium"><FiPackage /> Processing</span>;
        } else {
            return <span className="flex items-center gap-2 text-orange-500 text-sm font-medium"><FiClock /> Pending Payment</span>;
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8 text-dark dark:text-white">Orders Management</h1>

            {loading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-100 dark:bg-white/5 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white dark:bg-[#362F5C] rounded-2xl shadow-sm border border-transparent dark:border-white/5 overflow-hidden">
                            {/* Order Header */}
                            <div
                                className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                onClick={() => toggleExpand(order._id)}
                            >
                                <div className="flex items-center gap-6 flex-1">
                                    <div className="flex-shrink-0">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Order ID</p>
                                        <p className="font-mono text-sm opacity-70">{order._id.substring(0, 8)}...</p>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Customer</p>
                                        <p className="font-medium">{order.user?.name || "Guest"}</p>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total</p>
                                        <p className="font-bold text-primary">${order.totalPrice?.toFixed(2)}</p>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Status</p>
                                        {getStatusBadge(order)}
                                    </div>

                                    <div className="flex-shrink-0">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Date</p>
                                        <p className="text-sm opacity-60">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="text-gray-400">
                                    {expandedOrder === order._id ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedOrder === order._id && (
                                <div className="border-t border-gray-100 dark:border-white/10 p-6 bg-gray-50 dark:bg-black/20">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Customer Info */}
                                        <div>
                                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                                <FiUser /> Customer Information
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <p><span className="font-semibold">Name:</span> {order.user?.name || "N/A"}</p>
                                                <p className="flex items-center gap-2"><FiMail className="text-gray-400" /> {order.user?.email || "N/A"}</p>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div>
                                            <h3 className="font-bold text-lg mb-4">Order Items</h3>
                                            <div className="space-y-3">
                                                {order.orderItems?.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 bg-white dark:bg-[#362F5C] p-3 rounded-xl">
                                                        <div className="relative w-12 h-12 bg-gray-100 dark:bg-black/20 rounded-lg overflow-hidden flex-shrink-0">
                                                            <SafeImage src={item.product?.image} alt={item.product?.name} fill className="object-cover" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-sm truncate">{item.product?.name || "Product"}</p>
                                                            <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.price}</p>
                                                        </div>
                                                        <p className="font-bold text-sm">${(item.quantity * item.price).toFixed(2)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment & Delivery Status */}
                                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
                                        <h3 className="font-bold text-lg mb-4">Order Status</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Payment Status */}
                                            <div className="bg-white dark:bg-[#362F5C] p-4 rounded-xl">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-semibold flex items-center gap-2">
                                                        <FiDollarSign className="text-primary" /> Payment
                                                    </span>
                                                    <span className={`text-sm font-bold ${order.isPaid ? 'text-green-500' : 'text-orange-500'}`}>
                                                        {order.isPaid ? 'Paid' : 'Pending'}
                                                    </span>
                                                </div>
                                                {order.isPaid && order.paidAt && (
                                                    <p className="text-xs text-gray-500">Paid on {new Date(order.paidAt).toLocaleString()}</p>
                                                )}
                                                {!order.isPaid && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(order._id, 'isPaid', true)}
                                                        className="mt-2 text-xs bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary/80 transition-colors"
                                                    >
                                                        Mark as Paid
                                                    </button>
                                                )}
                                            </div>

                                            {/* Delivery Status */}
                                            <div className="bg-white dark:bg-[#362F5C] p-4 rounded-xl">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-semibold flex items-center gap-2">
                                                        <FiPackage className="text-blue-500" /> Delivery
                                                    </span>
                                                    <span className={`text-sm font-bold ${order.isDelivered ? 'text-green-500' : 'text-gray-500'}`}>
                                                        {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                                                    </span>
                                                </div>
                                                {order.isDelivered && order.deliveredAt && (
                                                    <p className="text-xs text-gray-500">Delivered on {new Date(order.deliveredAt).toLocaleString()}</p>
                                                )}
                                                {!order.isDelivered && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(order._id, 'isDelivered', true)}
                                                        className="mt-2 text-xs bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                                                    >
                                                        Mark as Delivered
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {orders.length === 0 && (
                        <div className="text-center py-12 text-gray-500">No orders found.</div>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
