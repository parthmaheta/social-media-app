import { Document, Model, ObjectId } from "mongoose"

interface Friend {
  friend: ObjectId
  conversation: ObjectId
}
interface UseSchema extends Document {
  name: string
  email: string
  password: string
  dob: Date
  gender: "M" | "F" | "O"
  profilePic: string
  friends: ObjectId[]
  sentRequest: ObjectId[]
  recievedRequest: ObjectId[]
  posts: Friend[]
}

let UserModel: Model<UseSchema>
export = UserModel
