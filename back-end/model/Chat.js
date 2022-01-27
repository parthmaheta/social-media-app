const mongoose = require("mongoose")

const ChatSchema = new mongoose.Schema({
  text: { type: String, maxlength: 200 },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  media: { type: String, match: /\.(jpe?G|png|mp3|mp4)$/ },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversations",
    required: true,
  },
  sentAt: { type: Date, default: Date.now },
})

const Chat = mongoose.model("Chats", ChatSchema)
module.exports = Chat
