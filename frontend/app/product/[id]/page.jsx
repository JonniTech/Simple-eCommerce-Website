"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import SafeImage from "@/components/SafeImage";
import { FiShoppingCart, FiArrowLeft, FiCheck } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductDetailsPage({ params }) {
    const { id } = use(params);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const router = useRouter();
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data.product || data);
            } catch (err) {
                console.error(err);
                setError("Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
                <div className="bg-gray-200 dark:bg-white/5 rounded-3xl h-[400px] md:h-[600px]"></div>
                <div className="space-y-6 pt-10">
                    <div className="h-8 bg-gray-200 dark:bg-white/5 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-1/4"></div>
                    <div className="h-24 bg-gray-200 dark:bg-white/5 rounded w-full"></div>
                    <div className="h-12 bg-gray-200 dark:bg-white/5 rounded w-1/3"></div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <button onClick={() => router.back()} className="text-primary hover:underline">
                    &larr; Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-background dark:bg-dark">
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 hover:text-primary transition-all mb-8">
                    <FiArrowLeft /> Back to Products
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {/* Image Section */}
                    <div className="relative w-full aspect-square md:aspect-[4/5] bg-white dark:bg-white/5 rounded-3xl overflow-hidden shadow-xl border border-white/20 dark:border-white/5 group">
                        <SafeImage
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            priority
                        />
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <span className="text-primary font-bold tracking-wider text-sm uppercase">New Arrival</span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-dark dark:text-white mt-2 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 mt-4">
                                <span className="text-3xl font-bold text-primary">${product.price.toLocaleString()}</span>
                                {product.stock > 0 ? (
                                    <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                                        In Stock ({product.stock})
                                    </span>
                                ) : (
                                    <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                                        Out of Stock
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>{product.description}</p>
                        </div>

                        <div className="pt-6 border-t border-gray-200 dark:border-white/10">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={`w-full md:w-auto min-w-[200px] btn-primary py-4 text-lg ${isAdded ? "bg-green-500 hover:bg-green-600" : ""
                                    }`}
                            >
                                {isAdded ? (
                                    <>
                                        <FiCheck size={24} /> Added
                                    </>
                                ) : (
                                    <>
                                        <FiShoppingCart size={20} /> Add to Cart
                                    </>
                                )}
                            </button>
                            {product.stock === 0 && (
                                <p className="mt-2 text-sm text-red-500">This item is currently unavailable.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
