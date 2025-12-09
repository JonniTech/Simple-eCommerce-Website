import { Router } from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";
import protect from "../auth/protect.js";

const router = Router();

router.post("/", protect, createPaymentIntent);

export default router;
