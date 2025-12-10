"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/products/productCard";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-16 text-center animate-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl md:text-6xl font-extrabold text-dark dark:text-white mb-6 tracking-tight">
          Our <span className="text-primary animate-pulse-slow">Products</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Premium gadgets curated for the modern lifestyle.
        </p>
      </div>

      {loading ? (
        // Skeleton Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-[400px] bg-gray-200 dark:bg-white/5 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 text-xl">{error}</p>
          <button onClick={fetchProducts} className="btn-primary mt-4">Retry</button>
        </div>
      ) : (
        // Products Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
      {products.length === 0 && !loading && !error && (
        <div className="py-20 text-center text-gray-500">
          <p className="text-xl">No products found.</p>
        </div>
      )}
    </div>
  );
}
