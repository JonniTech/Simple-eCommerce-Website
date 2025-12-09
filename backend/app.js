import express from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import cors from "cors";

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "API is running..." });
});


app.use(errorHandler); // Error handler middleware

export default app;
