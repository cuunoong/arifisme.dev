import { NextApiRequest, NextApiResponse } from 'next'
import Comment, { CommentData } from '../../models/comment'

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.key !== process.env.API_SECRET)
    return res
      .status(500)
      .json({ status: 'ERROR', message: 'Invalid Signature' })
  try {
    const input = req.body as CommentData
    await Comment.getInstance().add(input)
    return res.json({ status: 'OK' })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ status: 'ERROR', message: error })
  }
}

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') return post(req, res)
  return res.status(404).json({ status: 'ERROR', message: 'Not Found' })
}
