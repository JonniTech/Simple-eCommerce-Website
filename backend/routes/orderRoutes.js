import {
  createOrder,
  getMyOrders,
  getOrders,
  getDashboardStats,
  getOrderById,
  updateOrderStatus,
  updateOrderToPaid,
} from "../controllers/orderController.js";

import { Router } from "express";
import protect from "../auth/protect.js";
import isAdmin from "../auth/isAdmin.js";

const router = Router();

// Private routes
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.put("/:id/pay", protect, updateOrderToPaid);

// Admin routes
router.get("/stats", protect, isAdmin, getDashboardStats);
router.get("/:id", protect, isAdmin, getOrderById);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);
router.get("/", protect, isAdmin, getOrders);

export default router;
