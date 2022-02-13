import { Document, ObjectId, Model } from "mongoose"

interface Conversation extends Document {
  partcipants: ObjectId[]
}

let ConversationModel: Model<Conversation>
export = ConversationModel
