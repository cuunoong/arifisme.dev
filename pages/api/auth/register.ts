import bcrypt from 'bcrypt'
import User, { IUser } from '../../../models/user'
import { ERROR, NOT_FOUND, OK } from '../../../api'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../configs/mongodb.config'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return NOT_FOUND(res)
  try {
    // Validation
    const data = req.body as IUser
    if (!data.email || !data.name || !data.password)
      return ERROR(res, {
        email: !data.email ? 'Email required' : undefined,
        password: !data.password ? 'Password required' : undefined,
        name: !data.name ? 'Name required' : undefined,
      })

    // Connect to db
    await dbConnect()

    // Check if theres an user with requested email

    const user = await User.findOne({ email: data.email })
    if (user) return ERROR(res, `Email ${data.email} has used by another user`)

    // Create new User
    const newUser = await User.create({
      ...data,
      password: bcrypt.hashSync(data.password, 10),
    })
    return OK(res, newUser)
  } catch (error) {}
}
