import express from "express";
import { likePost, unlikePost, getPostLikes } from "../controllers/likeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/like", authMiddleware, likePost);
router.delete("/:id/unlike", authMiddleware, unlikePost);
router.get("/:id/likes", getPostLikes); // get total likes

export default router;
