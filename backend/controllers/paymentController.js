import asyncHandler from "express-async-handler";
import Stripe from "stripe";

// @desc   Create Stripe payment intent
// @route  POST /api/payment
// @access Private
export const createPaymentIntent = asyncHandler(async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Stripe Secret Key is missing in backend .env");
    res.status(500);
    throw new Error("Stripe Secret Key is missing in backend .env");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { totalPrice } = req.body;

  // Validate totalPrice
  if (totalPrice === undefined || totalPrice === null || isNaN(totalPrice) || totalPrice <= 0) {
    console.error("Invalid total price:", totalPrice);
    res.status(400);
    throw new Error("Please add a valid total price");
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100), // amount in cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500);
    throw new Error(error.message || "Stripe payment failed");
  }
});
