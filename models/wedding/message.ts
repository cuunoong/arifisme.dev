import mongoose from 'mongoose'

export interface IMessage {
  name: string
  message: string
}

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
const Message =
  mongoose.models.Message || mongoose.model('Message', messageSchema)
export default Message
