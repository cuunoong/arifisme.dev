import mongoose from 'mongoose'

const dbConnect = async () =>
  await mongoose.connect(process.env.MONGODB_CONFIG as string)

export default dbConnect
