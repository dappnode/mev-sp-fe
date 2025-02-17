import { useEffect, useState } from 'react'

/**
 * Checks if the discourse link for the vanilla blocks ban proposal exists.
 * the request is done through the server side `discourse-api.ts` to avoid CORS.
 */
export const useDiscourseLinkExists = (address: string | undefined) => {
  const [banProposalExists, setBanProposalExists] = useState<boolean>(false)

  useEffect(() => {
    const checkLinkExists = async () => {
      if (!address) return

      const res = await fetch(`/api/discourse-api?address=${address}`)
      const jsonResponse = await res.json()

      if (jsonResponse.exists === true) {
        setBanProposalExists(true)
      } else setBanProposalExists(false)
    }

    checkLinkExists()
  }, [address])

  return banProposalExists
}
