import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../../../models/user'
import { ERROR, NOT_FOUND, OK } from '../../../api'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../configs/mongodb.config'

/**
 * @swagger
 * /api/auth/login:
 *    post:
 *      tags: ['Authentication']
 *      summary: Login user
 *      produces: ['application/json']
 *      requestBody:
 *        description: Login to our server
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - email
 *                - password
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: yourmail@mail.com
 *                password:
 *                  type: string
 *                  example: Your secret password
 *      responses:
 *        200:
 *          description: Retrive user token
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: SUCCESS
 *                    value: SUCCESS
 *                  data:
 *                    type: object
 *                    properties:
 *                      token:
 *                        type: string
 *                        example: asdkhansdjkamdnaskhdj8wiuy23kj2h13j12h3g1ku23g
 *                      user:
 *                        type: object
 *                        properties:
 *                          name:
 *                            type: string
 *                            example: Fullname
 *                          email:
 *                            type: string
 *                            example: youremail@mail.com
 *        400:
 *          description: Bad Request
 */
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
    if (!user)
      return ERROR(res, {
        message: `Invalid email address`,
        email: false,
        password: false,
      })
    if (!bcrypt.compareSync(data.password, user.password))
      return ERROR(res, {
        message: `Invalid password`,
        email: true,
        password: false,
      })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)

    return OK(res, { token, user: { name: user.name, email: user.email } })
  } catch (error) {
    console.log(error)

    return ERROR(res, error)
  }
}
