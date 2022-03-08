const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /\w+\.?\w*@\w+\.\w+/.test(v)
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: { type: String, minlength: [6, "minimum 6 char"], required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["M", "F", "O"], required: true },
  profilePic: {
    type: String,
    default: function () {
      if (this.gender === "M") return "img/male_default_avatar.jpg"
      else if (this.gender === "F") return "img/female_default_avatar.jpg"
      else if (this.gender === "O") return "img/other_default_avatar.jpg"
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

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const bcrypt = require("bcrypt")
      const hashedPassword = await bcrypt.hash(this.password, 10)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    return next(error)
  }
})
const User = mongoose.model("Users", UserSchema)
module.exports = User
