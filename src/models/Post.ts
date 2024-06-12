import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "Empty string.",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
