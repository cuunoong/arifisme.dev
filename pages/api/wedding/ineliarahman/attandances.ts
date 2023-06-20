import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../configs/mongodb.config'
import Attandance from '../../../../models/wedding/attandance'

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Connect to db
    await dbConnect()

    // Create new Attandance
    const newAttandance = await Attandance.create({
      ...req.body,
    })

    return res.json({ status: 'OK' })
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
  return res.status(404).json({ status: 'ERROR', message: 'Not Found' })
}
