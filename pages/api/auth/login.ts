import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../../../models/user'
import { ERROR, NOT_FOUND, OK } from '../../../api'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../configs/mongodb.config'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return NOT_FOUND(res)
  try {
    // Validation
    const data = req.body as IUser
    if (!data.email || !data.password)
      return ERROR(res, {
        email: !data.email ? 'Email required' : undefined,
        password: !data.password ? 'Password required' : undefined,
      })

    // Connect to db
    await dbConnect()

    // Check if theres an user with requested email
    const user = await User.findOne({ email: data.email })
    if (!user) return ERROR(res, { email: `Doesn't match` })
    if (!bcrypt.compareSync(data.password, user.password))
      return ERROR(res, { password: `Doesn't match` })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)

    return OK(res, { token })
  } catch (error) {
    console.log(error)

    return ERROR(res, error)
  }
}
