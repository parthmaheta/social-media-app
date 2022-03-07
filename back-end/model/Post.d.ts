import { Document, Model, ObjectId } from "mongoose"

interface PostSchema extends Document {
  caption: string
  media: string
  comments: ObjectId[]
  likes: ObjectId[]
  shares: ObjectId[]
  sharedPost: ObjectId
  createdAt: Date
}

let PostModel: Model<PostSchema>
export = PostModel
