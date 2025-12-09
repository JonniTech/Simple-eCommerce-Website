import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Product name is required"] },
        description: { type: String, required: [true, "Product description is required"] },
        price: { type: Number, required: [true, "Product price is required"] },
        image: { type: String, required: [true, "Product image URL is required"] },
        stock: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
