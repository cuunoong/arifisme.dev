import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/user'
import dbConnect from '../configs/mongodb.config'
const { JWT_SECRET } = process.env

export const OK = (res: NextApiResponse, data?: any) =>
  res.json({ status: 'SUCCESS', data })
export const NOT_FOUND = (res: NextApiResponse, message?: any) =>
  ERROR(res, message || 'Not Found', 404)
export const ERROR = (res: NextApiResponse, message?: any, statusCode = 400) =>
  res.status(statusCode).json({ status: 'ERROR', message })

export const useToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    user: IUser
  ) => Promise<any>
) => {
  const token = (req.headers.authorization || req.query.token) as string

  if (!token) return ERROR(res, 'Token must be provided')

  try {
    const { id } = jwt.verify(token, JWT_SECRET as string) as { id: string }
    await dbConnect()
    const user = await User.findById(id)
    req.query.token = ''
    return await handler(req, res, user)
  } catch (error) {
    console.log(error)
    return ERROR(res, 'Token error')
  }
}
