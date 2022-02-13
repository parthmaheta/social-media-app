import { ObjectId, Document, Model } from "mongoose"

interface Comment extends Document {
  text: string
  replies: ObjectId[]
  likes: ObjectId[]
}

let CommentModel: Model<Comment>
export = CommentModel
