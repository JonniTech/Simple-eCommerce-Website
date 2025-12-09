import { Router } from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

import protect from "../auth/protect.js";
import isAdmin from "../auth/isAdmin.js";

const router = Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
