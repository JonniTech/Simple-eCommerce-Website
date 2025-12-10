"use client";

import Link from "next/link";
import { FiCheckCircle, FiShoppingBag } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

export default function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");

    return (
        <div className="min-h-screen pt-24 flex items-center justify-center p-6 bg-background dark:bg-dark">
            <div className="text-center max-w-md w-full bg-white dark:bg-[#362F5C] p-10 rounded-3xl shadow-xl border border-white/20 dark:border-white/5 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle size={40} />
                </div>

                <h1 className="text-3xl font-bold mb-4 text-dark dark:text-white">Payment Successful!</h1>
                <p className="text-gray-500 dark:text-gray-300 mb-8">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>

                {orderId && (
                    <div className="mb-8 p-4 bg-gray-50 dark:bg-black/20 rounded-xl text-sm font-mono opacity-70">
                        Order ID: {orderId}
                    </div>
                )}

                <Link href="/" className="btn-primary w-full justify-center">
                    <FiShoppingBag /> Continue Shopping
                </Link>
            </div>
        </div>
    );
}
