import { NextApiRequest, NextApiResponse } from 'next'
import { NOT_FOUND } from '../../../api'
import register from '../../../api/auth/register'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return NOT_FOUND(res)
  return await register(req, res)
}
