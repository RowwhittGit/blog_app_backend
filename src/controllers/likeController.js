import LikeModel from "../models/LikeModel.js";
import PostModel from "../models/PostModel.js";

//Like a post
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // Check if already liked
    const existingLike = await LikeModel.findOne({ user: userId, post: postId });
    if (existingLike) {
      return res.status(400).json({ message: "You have already liked this post" });
    }

    const like = await LikeModel.create({ user: userId, post: postId });
    res.status(201).json({ message: "Post liked", like });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unlike a post
export const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const deleted = await LikeModel.findOneAndDelete({ user: userId, post: postId });
    if (!deleted) return res.status(400).json({ message: "You have not liked this post" });

    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get total likes for a post
export const getPostLikes = async (req, res) => {
  try {
    const postId = req.params.id;
    const totalLikes = await LikeModel.countDocuments({ post: postId });
    res.status(200).json({ postId, totalLikes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
