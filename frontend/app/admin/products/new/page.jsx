"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FiSave, FiX, FiImage } from "react-icons/fi";
import Link from "next/link";

export default function NewProduct() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        stock: "",
        category: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post("/products", {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            });
            router.push("/admin/products");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-dark dark:text-white">Add New Product</h1>
                    <Link href="/admin/products" className="text-gray-500 hover:text-dark dark:hover:text-white">
                        <FiX size={24} />
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white dark:bg-[#362F5C] p-8 rounded-3xl shadow-sm border border-transparent dark:border-white/5">
                    <div className="space-y-6">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-dark dark:text-white">Product Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Enter product name"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-dark dark:text-white">Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                placeholder="Enter product description"
                            />
                        </div>

                        {/* Price and Stock */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-dark dark:text-white">Price ($) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    step="0.01"
                                    min="0"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-dark dark:text-white">Stock *</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-dark dark:text-white">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="e.g., Electronics, Clothing, etc."
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-bold mb-2 text-dark dark:text-white">Image URL *</label>
                            <div className="relative">
                                <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            {formData.image && (
                                <div className="mt-4 relative w-full h-48 bg-gray-100 dark:bg-black/20 rounded-xl overflow-hidden">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                </div>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary flex-1 py-3 text-lg font-bold"
                            >
                                {loading ? "Creating..." : <><FiSave className="mr-2" /> Create Product</>}
                            </button>
                            <Link
                                href="/admin/products"
                                className="px-8 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all font-bold text-center"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
