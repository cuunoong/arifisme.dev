import { NextApiRequest, NextApiResponse } from 'next'
import Lesson, { LessonData } from '../../models/lesson'

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.key !== process.env.API_SECRET)
    return res
      .status(500)
      .json({ status: 'ERROR', message: 'Invalid Signature' })
  try {
    const input = req.body as LessonData
    await Lesson.getInstance().add(input)
    return res.json({ status: 'OK' })
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', message: error })
  }
}

export default async function lessons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') return post(req, res)
  return res.status(404).json({ status: 'ERROR', message: 'Not Found' })
}
