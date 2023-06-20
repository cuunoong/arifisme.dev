import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../configs/mongodb.config'
import Message from '../../../../models/wedding/message'

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Connect to db
    await dbConnect()

    // Create new Message
    const newMessage = await Message.create({
      ...req.body,
    })

    return res.json({ status: 'OK' })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ status: 'ERROR', message: error })
  }
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Connect to db
    await dbConnect()

    // Create new Message
    const messages = await Message.find()
      .select({
        name: 1,
        message: 1,
        createdAt: 1,
        _id: 0,
      })
      .limit(10)
      .sort({ createdAt: 'desc' })

    return res.json({ status: 'OK', messages })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ status: 'ERROR', message: error })
  }
}

export default async function attandances(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') return post(req, res)
  if (req.method === 'GET') return get(req, res)
  return res.status(404).json({ status: 'ERROR', message: 'Not Found' })
}
