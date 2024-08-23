import { useCallback, useEffect } from 'react'
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import contractInterface from '@/contract/abi.json'
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchOnChainProof } from '@/client/api/queryFunctions'

export function useClaimRewards() {
  const { address } = useAccount()
  const queryClient = useQueryClient()

  const abi = [...contractInterface] as const

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
      console.error('Error claiming rewards:', err)
    }
  }, [address, onChainProofQuery])

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
