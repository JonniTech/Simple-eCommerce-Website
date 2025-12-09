import { Router } from "express";
import { getUsers, deleteUser } from "../controllers/userController.js";
import protect from "../auth/protect.js";
import isAdmin from "../auth/isAdmin.js";

const router = Router();

router.get("/", protect, isAdmin, getUsers);
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;
