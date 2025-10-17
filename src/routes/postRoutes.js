import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(authMiddleware, createPost);
router
  .route("/:id")
  .get(getPostById)
  .put(authMiddleware, updatePost)
  .delete(authMiddleware, deletePost);

export default router;
