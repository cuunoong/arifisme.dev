import { NextApiRequest, NextApiResponse } from 'next'
import { NOT_FOUND } from '../../../api'
import login from '../../../api/auth/login'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return NOT_FOUND(res)
  return await login(req, res)
}
