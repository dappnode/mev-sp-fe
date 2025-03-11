import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { fetchValidatorsByDepositor } from '@/client/api/queryFunctions'
import {  Proposal } from '@/client/api/schemas'

/**
 * Filters and returns validators banned by DAO
 * @param userWrongFeeProposals Array of user's wrong fee proposals
 */
export function useFilterValidatorsBannedByDAO(
  userWrongFeeProposals: Proposal[]
) {
  const { address } = useAccount()

  const { data: validators = [] } = useQuery({
    queryKey: ['user-validators', address],
    queryFn: () => fetchValidatorsByDepositor(address),
    enabled: !!address,
  })

  const bannedValidators = validators.filter(
    (validator) => validator.status === 'banned'
  )

  // Is considered a validator banned by DAO if its state is 'banned' but it has not proposed a wrong fee block
  const validatorsBannedByDAO = bannedValidators.filter(
    (validator) =>
      !userWrongFeeProposals.some(
        (proposal) => proposal.validatorIndex === validator.validatorIndex
      )
  )

  return validatorsBannedByDAO
}
