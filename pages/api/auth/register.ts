import bcrypt from 'bcrypt'
import User, { IUser } from '../../../models/user'
import { ERROR, NOT_FOUND, OK } from '../../../api'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../configs/mongodb.config'
import jwt from 'jsonwebtoken'

/**
 * @swagger
 * /api/auth/register:
 *    post:
 *      tags: ['Authentication']
 *      summary: Register new user
 *      produces: ['application/json']
 *      requestBody:
 *        description: Register to our server
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - email
 *                - password
 *                - name
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: yourmail@mail.com
 *                password:
 *                  type: string
 *                  example: Your secret password
 *                name:
 *                  type: string
 *                  example: Fullname
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

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string
    )

    return OK(res, { token, user: { name: data.name, email: data.email } })
  } catch (error) {
    console.log(error)

    return ERROR(res, { error })
  }
}
