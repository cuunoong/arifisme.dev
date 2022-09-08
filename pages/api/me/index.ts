import { NextApiRequest, NextApiResponse } from 'next'
import { OK, useToken } from '../../../api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await useToken(req, res, async (req, res, user) => {
    return OK(res, user)
  })
}
