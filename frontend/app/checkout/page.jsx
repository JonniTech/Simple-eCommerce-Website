"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FiLock, FiAlertCircle } from "react-icons/fi";

// Initialize Stripe outside of component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ amount, onOrderCreated }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);
        setMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
            },
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
            return;
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            onOrderCreated(); // Trigger order creation on backend
        } else {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <PaymentElement />
            </div>

            {message && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm">
                    <FiAlertCircle /> {message}
                </div>
            )}

            <button
                disabled={isProcessing || !stripe || !elements}
                className="btn-primary w-full py-4 text-lg font-bold shadow-lg"
            >
                {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`} <FiLock className="ml-2" />
            </button>
        </form>
    );
}

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const { user, loading } = useAuth();
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login?redirect=/checkout");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (cart.length > 0 && user) {
            // Create PaymentIntent
            api.post("/payment", { totalPrice }).then(({ data }) => {
                setClientSecret(data.clientSecret);
            }).catch(err => console.error("Payment intent failed", err));
        }
    }, [cart, totalPrice, user]);

    const handleOrderCreated = async () => {
        try {
            // Create order in DB
            const orderItems = cart.map(item => ({
                product: item._id,
                quantity: item.quantity,
                price: item.price
            }));

            const { data } = await api.post("/orders", {
                orderItems,
                totalPrice
            });

            // Mark order as paid after successful payment
            await api.put(`/orders/${data.order._id}/pay`);

            clearCart();
            router.push(`/checkout/success?order_id=${data.order._id}`);
        } catch (err) {
            console.error("Order creation failed", err);
            // Even if order creation fails, payment succeeded. 
            // Ideally we should handle this more gracefully, but for now redirect with error param
            router.push("/checkout/success?error=order_creation_failed");
        }
    };

    if (loading || !user || cart.length === 0) {
        return <div className="min-h-screen pt-24 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
    }

    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#9787F3',
            colorBackground: '#ffffff',
            colorText: '#2D274B',
        },
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-background dark:bg-dark">
            <div className="max-w-xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center text-dark dark:text-white">Secure Checkout</h1>

                <div className="bg-white dark:bg-[#362F5C] p-8 rounded-3xl shadow-xl border border-white/20 dark:border-white/5">
                    <div className="mb-8 pb-8 border-b border-gray-100 dark:border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="opacity-70">Total Amount</span>
                            <span className="font-bold text-2xl text-primary">${totalPrice.toFixed(2)}</span>
                        </div>
                        <p className="text-sm opacity-50">Includes all taxes and fees</p>
                    </div>

                    {clientSecret && (
                        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                            <CheckoutForm amount={totalPrice} onOrderCreated={handleOrderCreated} />
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
}
