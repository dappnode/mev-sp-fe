import { useCallback, useEffect } from 'react'
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import contractInterface from '@/contract/abi.json'
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'
import { fetchOnChainProof } from '@/client/api/queryFunctions'

export function useClaimRewards() {
  const { address } = useAccount()
  const queryClient = useQueryClient()

  const {
    writeContractAsync: write,
    isPending: awaitingWalletConfirmations,
    data: hash,
    error: writeError,
  } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess: isReceiptSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({ hash })

  const onChainProofQuery = useQuery({
    queryKey: ['onchain-proof', address],
    queryFn: () => fetchOnChainProof(address as `0x${string}`),
    enabled: !!address,
  })

  useEffect(() => {
    if (isReceiptSuccess) {
      queryClient.invalidateQueries({ queryKey: ['user-validators', address] })
    }
  }, [isReceiptSuccess, address, queryClient])

  const claimRewards = useCallback(async () => {
    const abi = [...contractInterface] as const
    try {
      await write({
        address: SMOOTHING_POOL_ADDRESS,
        abi,
        functionName: 'claimRewards',
        args: [
          address,
          onChainProofQuery.data?.leafAccumulatedBalance,
          onChainProofQuery.data?.merkleProofs,
        ],
      })
    } catch (err) {
      /* eslint-disable no-console */
      console.error('Error claiming rewards:', err)
    }
  }, [address, onChainProofQuery, write])

  return {
    claimRewards,
    awaitingWalletConfirmations,
    isConfirming,
    isReceiptSuccess,
    writeError,
    receiptError,
    hash,
  }
}
