const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  caption: { type: String, maxlength: 200 },
  image: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  sharedPost: { type: mongoose.SchemaType.ObjectId, ref: "Comments" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = mongoose.model("Posts", PostSchema)
module.exports = Post
