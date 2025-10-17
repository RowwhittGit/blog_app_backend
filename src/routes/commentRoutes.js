import express from "express";
import { addComment, updateComment, deleteComment } from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:postId", authMiddleware, addComment);  // add comment
router.put("/:id", authMiddleware, updateComment);    // update comment
router.delete("/:id", authMiddleware, deleteComment); // delete comment

export default router;
