"use client";

import { useCart } from "@/context/CartContext";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingCart } from "react-icons/fi";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <FiShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet.</p>
                <Link href="/" className="btn-primary">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-background dark:bg-dark">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item._id} className="bg-white dark:bg-[#362F5C] p-4 rounded-2xl flex gap-4 shadow-sm border border-transparent dark:border-white/5 hover:border-primary/20 transition-all">
                                <div className="relative w-24 h-24 bg-gray-100 dark:bg-black/20 rounded-xl overflow-hidden flex-shrink-0">
                                    <SafeImage src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg dark:text-white line-clamp-1">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-black/20 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-white/10 rounded-md transition-colors"
                                            >
                                                <FiMinus size={14} />
                                            </button>
                                            <span className="font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-white/10 rounded-md transition-colors"
                                            >
                                                <FiPlus size={14} />
                                            </button>
                                        </div>
                                        <p className="font-bold text-xl text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-[#362F5C] p-6 rounded-3xl shadow-lg border border-transparent dark:border-white/5 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between opacity-70">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between opacity-70">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="h-px bg-gray-200 dark:bg-white/10 my-4"></div>
                                <div className="flex justify-between font-bold text-xl">
                                    <span>Total</span>
                                    <span className="text-primary">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="btn-primary w-full py-4 text-lg justify-center">
                                Proceed to Checkout <FiArrowRight />
                            </Link>

                            <button onClick={clearCart} className="w-full mt-4 text-sm text-red-500 hover:underline opacity-70 hover:opacity-100">
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
