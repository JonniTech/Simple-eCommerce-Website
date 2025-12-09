import {
  createOrder,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";

import { Router } from "express";
import protect from "../auth/protect.js";
import isAdmin from "../auth/isAdmin.js";

const router = Router();

// Private routes
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// Admin route
router.get("/", protect, isAdmin, getOrders); // hii ya kuget all orders

export default router;
