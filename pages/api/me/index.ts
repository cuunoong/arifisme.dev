import { NextApiRequest, NextApiResponse } from 'next'
import { OK, useToken } from '../../../api'

/**
 * @swagger
 * /api/me:
 *    get:
 *      tags: ['Account']
 *      security:
 *        - BearerAuth: []
 *      summary: Get current user
 *      produces: ['application/json']
 *      responses:
 *        200:
 *          description: User data
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
 *                      user:
 *                        type: object
 *                        properties:
 *                          name:
 *                            type: string
 *                            example: Fullname
 *                          email:
 *                            type: string
 *                            example: youremail@mail.com
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await useToken(req, res, async (req, res, user) => {
    return OK(res, {
      user: {
        name: user.name,
        email: user.email,
      },
    })
  })
}
