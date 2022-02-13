import { Document, Model, ObjectId } from "mongoose"

interface Chat extends Document {
  text: string
  from: ObjectId
  media: string
  conversationId: ObjectId
  sentAt: Date
}

let ChatModel: Model<Chat>
export = ChatModel
