const mongoose = require("mongoose")

const Conversations = new mongoose.Schema({
  partcipants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  ],
})

const Conversations = mongoose.model("Conversations", Conversations)
module.exports = Conversations
