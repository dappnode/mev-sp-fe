import { getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { IRON_SESSION_CONFIG } from '@/utils/config'
import type { SessionData } from '@/types/iron-session'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await getIronSession<SessionData>(
      req,
      res,
      IRON_SESSION_CONFIG
    )
    session.destroy()
    return res.send({ ok: true })
  }
  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
