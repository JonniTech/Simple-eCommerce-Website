"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get("/products");
            setProducts(data.products || []);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const response = await api.delete(`/products/${id}`);
            if (response.data.success) {
                // Remove from local state
                setProducts(products.filter(p => p._id !== id));
                alert("Product deleted successfully!");
            }
        } catch (error) {
            console.error("Delete error:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to delete product";
            alert(`Error: ${errorMessage}`);
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-dark dark:text-white">Products</h1>
                <Link href="/admin/products/new" className="btn-primary">
                    <FiPlus /> New Product
                </Link>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-24 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white dark:bg-[#362F5C] p-4 rounded-2xl shadow-sm border border-transparent dark:border-white/5 flex gap-4 items-center group">
                            <div className="relative w-24 h-24 bg-gray-100 dark:bg-black/20 rounded-xl overflow-hidden flex-shrink-0">
                                <SafeImage src={product.image} alt={product.name} fill className="object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg text-dark dark:text-white truncate">{product.name}</h3>
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                    <span className="font-mono text-primary font-bold">${product.price}</span>
                                    <span>Stock: {product.stock}</span>
                                    <span className="truncate max-w-[200px] hidden md:block opacity-60">{product.category}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/admin/products/edit/${product._id}`}
                                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                >
                                    <FiEdit2 size={18} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {products.length === 0 && (
                        <div className="text-center py-12 text-gray-500">No products found. Add one!</div>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
