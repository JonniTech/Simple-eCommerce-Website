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
    // Payment status will be updated after successful payment
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

// @desc   Get dashboard stats (admin)
// @route  GET /api/orders/stats
// @access Private/Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  const products = await import("../models/Product.js").then(m => m.default.countDocuments());
  const users = await import("../models/User.js").then(m => m.default.countDocuments());

  const totalOrders = orders.length;
  const totalSales = orders
    .reduce((acc, order) => order.isPaid ? acc + order.totalPrice : acc, 0);

  const pendingOrders = orders.filter(o => !o.isPaid && !o.isDelivered).length;

  res.json({
    success: true,
    totalSales,
    totalOrders,
    totalProducts: products,
    totalUsers: users,
    pendingOrders
  });
});

// @desc   Get order by ID (admin)
// @route  GET /api/orders/:id
// @access Private/Admin
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("orderItems.product", "name price image");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json({ success: true, order });
});

// @desc   Update order status (admin)
// @route  PUT /api/orders/:id/status
// @access Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { isPaid, isDelivered } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (isPaid !== undefined) {
    order.isPaid = isPaid;
    order.paymentStatus = isPaid ? "Paid" : "Pending";
    if (isPaid && !order.paidAt) {
      order.paidAt = Date.now();
    }
  }

  if (isDelivered !== undefined) {
    order.isDelivered = isDelivered;
    if (isDelivered && !order.deliveredAt) {
      order.deliveredAt = Date.now();
    }
  }

  const updatedOrder = await order.save();
  res.json({ success: true, order: updatedOrder });
});

// @desc   Update order payment status after successful payment
// @route  PUT /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Verify the order belongs to the user
  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this order");
  }

  order.isPaid = true;
  order.paymentStatus = "Paid";
  order.paidAt = Date.now();

  const updatedOrder = await order.save();
  res.json({ success: true, order: updatedOrder });
});
