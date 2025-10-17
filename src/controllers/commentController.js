import CommentModel from "../models/CommentModel.js";

export const addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;
    const { content } = req.body;

    const comment = await CommentModel.create({ post: postId, user: userId, content });
    res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You cannot edit this comment" });
    }

    comment.content = req.body.content || comment.content;
    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You cannot delete this comment" });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
