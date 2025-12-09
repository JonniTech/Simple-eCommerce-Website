import dotenv from "dotenv";
dotenv.config();

console.log("Checking Environment Variables...");
console.log("Current Directory:", process.cwd());
console.log("STRIPE_SECRET_KEY Present:", !!process.env.STRIPE_SECRET_KEY);
if (process.env.STRIPE_SECRET_KEY) {
    console.log("Key Length:", process.env.STRIPE_SECRET_KEY.length);
    console.log("Key Prefix:", process.env.STRIPE_SECRET_KEY.substring(0, 7));
} else {
    console.log("Possible causes: .env file missing, misplaced, or empty.");
}
