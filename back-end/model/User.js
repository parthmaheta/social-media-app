const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 6, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["M", "F", "O"], required: true },
  profilePic: {
    type: String,
    default: function () {
      if (this.gender === "M") return "male_default_avatar.jpg"
      else if (this.gender === "F") return "female_default_avatar.jpg"
      else if (this.gender === "O") return "other_default_avatar.jpg"
    },
  },
  friends: [
    {
      friend: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },

      conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversations",
        required: true,
      },
    },
  ],
  sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  recievedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
})

const User = mongoose.model("Users", UserSchema)
module.exports = User
