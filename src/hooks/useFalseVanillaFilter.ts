import { useEffect, useState } from 'react'
import { Proposal } from '@/client/api/schemas'

/**
 * Returns only the proposals that are truly vanilla proposals.
 * This is because the oracle cannot fully guarantee that a block is vanilla,
 * even if it has been categorized as such.
 */
export function useFalseVanillaFilter({
  proposalsToCheck,
}: {
  proposalsToCheck: Proposal[]
}) {
  const [filteredVanillaProposals, setFilteredVanillaProposals] = useState<
    Proposal[]
  >([])

  useEffect(() => {
    const checkMEV = async () => {
      if (!proposalsToCheck?.length) return
      const filteredProposals: Proposal[] = []

      const requests = proposalsToCheck.map(async (proposal) => {
        try {
          const res = await fetch(`/api/mev-check-api?slot=${proposal.slot}`)
          const data: {
            isVanilla: boolean
            relays: string[]
          } = await res.json()

          if (data.isVanilla) {
            filteredProposals.push(proposal)
          }
        } catch (error) {
          throw new Error(`Failed to fetch MEV check for slot ${proposal.slot}`)
        }
      })

      await Promise.all(requests)

      setFilteredVanillaProposals(filteredProposals)
    }

    checkMEV()
  }, [proposalsToCheck])

  return filteredVanillaProposals
}
