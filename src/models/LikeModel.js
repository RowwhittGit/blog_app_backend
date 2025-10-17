import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
});

// Prevent same user liking the same post twice
likeSchema.index({ user: 1, post: 1 }, { unique: true });

const LikeModel = mongoose.model("Like", likeSchema);
export default LikeModel;
