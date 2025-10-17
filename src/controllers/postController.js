import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // comes from auth middleware

    const newPost = new PostModel({
      title,
      content,
      author: userId,
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
};

// Get single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate("author", "name email");

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error: error.message });
  }
};

// Update a post (only by owner)
export const updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // check ownership
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to edit this post" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error: error.message });
  }
};

// Delete a post (only by owner)
export const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // check ownership
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
};
