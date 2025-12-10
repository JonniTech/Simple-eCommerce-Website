"use client";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="bg-white dark:bg-[#362F5C] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-transparent dark:border-white/5 h-full flex flex-col">
            <div className="relative w-full h-64 bg-gray-100 dark:bg-black/20 overflow-hidden">
                <Link href={`/product/${product._id}`}>
                    <SafeImage
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <Link href={`/product/${product._id}`} className="block mb-2">
                    <h3 className="text-lg font-bold text-dark dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
                    <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Price</span>
                        <p className="font-bold text-xl text-primary">
                            ${product.price}
                        </p>
                    </div>

                    <button
                        onClick={() => onAddToCart(product)}
                        className="bg-gray-50 dark:bg-white/10 hover:bg-primary hover:text-white text-dark dark:text-white p-3 rounded-xl transition-all active:scale-95"
                        aria-label="Add to cart"
                    >
                        <FiShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
