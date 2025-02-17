import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { address } = req.query // Get address from the client request

    if (!address) {
      return res.status(400).json({ error: 'Missing address parameter' })
    }

    const externalApiUrl = `https://discourse.dappnode.io/t/${address}-vanilla-blocks-tracker/`

    const response = await fetch(externalApiUrl)

    if (response.ok) {
      return res.status(200).json({ exists: true })
    }
    return res.status(404).json({ exists: false })
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
