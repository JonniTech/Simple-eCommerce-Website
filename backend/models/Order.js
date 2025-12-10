import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, default: 1 },
                price: { type: Number, required: true },
            },
        ],
        totalPrice: { type: Number, required: true },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Pending",
        },
        paidAt: { type: Date },
        isDelivered: {
            type: Boolean,
            default: false,
        },
        deliveredAt: { type: Date },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
