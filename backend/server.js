import dotenv from "dotenv";
dotenv.config();

// Dynamic imports ensure dotenv runs FIRST
const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./configs/db.js");

await connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
