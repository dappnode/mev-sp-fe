import { getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'
import { IRON_SESSION_CONFIG } from '@/utils/config'
import type { SessionData } from '@/types/iron-session'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getIronSession<SessionData>(
      req,
      res,
      IRON_SESSION_CONFIG
    )
    try {
      const { message, signature } = req.body
      const siweMessage = new SiweMessage(message)
      if (!session.nonce)
        return res.status(422).json({ message: 'Invalid nonce.' })

      const { data: fields } = await siweMessage.verify({
        signature,
        nonce: session.nonce,
      })

      if (fields.nonce !== session.nonce)
        return res.status(422).json({ message: 'Invalid nonce.' })

      session.siwe = { address: fields.address }
      await session.save()
      return res.json({ ok: true })
    } catch (_error) {
      return res.json({ ok: false })
    }
  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
