const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
  text:{type:String,maxlength:200},
  replies:[{type:mongoose.Schema.Types.ObjectId,ref:'Comments'}],
  likes:[{type:mongoose.Schema.Types.ObjectId,ref:'Users'}],

})

const Comment = mongoose.model("Comments", CommentSchema)
module.exports = Comment
