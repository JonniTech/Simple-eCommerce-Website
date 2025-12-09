import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("Cannot delete admin user");
        }
        await user.deleteOne();
        res.json({ message: "User removed" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export { getUsers, deleteUser };
