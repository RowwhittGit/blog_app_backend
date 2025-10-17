import express from "express";
import { registerUser, loginUser, getUserProfile, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.delete("/:id", authMiddleware, deleteUser); // delete user

export default router;
