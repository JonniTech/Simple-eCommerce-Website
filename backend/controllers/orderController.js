import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

// @desc   Create new order
// @route  POST /api/orders
// @access Private
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("Please add at least one item to the order");
  }

  const order = new Order({
    user: req.user._id,
    orderItems: orderItems.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    })),
    totalPrice,
    paymentStatus: "Paid",
    paidAt: Date.now(),
  });

  const createdOrder = await order.save();

  res.status(201).json({ success: true, order: createdOrder });
});

// @desc   Get logged in user's orders
// @route  GET /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("orderItems.product", "name price image");
  res.json({ success: true, orders });
});

// @desc   Get all orders (admin)
// @route  GET /api/orders
// @access Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email").populate("orderItems.product", "name price image");
  res.json({ success: true, orders });
});
