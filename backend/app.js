import express from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

const app = express();

const allowed = [process.env.FRONTEND_URL || "https://simple-e-commerce-website-nu.vercel.app" || "http://localhost:3000"];
app.use(cors({
  origin: function(origin, cb){
    if(!origin) return cb(null, true);
    if(allowed.indexOf(origin) !== -1) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  }
}));

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

app.use(errorHandler); // Error handler middleware

export default app;
