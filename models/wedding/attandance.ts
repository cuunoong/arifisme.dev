import mongoose from 'mongoose'

export interface IAttandance {
  name: string
  isPresent: boolean
}

const attandanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isPresent: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)
const Attandance =
  mongoose.models.Attandance || mongoose.model('Attandance', attandanceSchema)
export default Attandance
