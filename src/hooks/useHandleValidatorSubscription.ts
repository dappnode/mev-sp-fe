import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'
import contractInterface from '@/contract/abi.json'
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'
import { useEffect, useCallback } from 'react'

export function useHandleValidatorSubscription( type: 'sub' | 'unsub',
  validatorId: number) {
  const { address } = useAccount()
  const queryClient = useQueryClient()

  const abi = [...contractInterface] as const

  const {
    writeContractAsync: write,
    data: hash,
    isPending: awaitingWalletConfirmations,
    error: writeError,
  } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess: isReceiptSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isReceiptSuccess) {
      queryClient.invalidateQueries({ queryKey: ['validators', address] })
    }
  }, [isReceiptSuccess, address, queryClient])

  const handleSubscription = useCallback(async () => {
    try {
      await write({
        abi,
        address: SMOOTHING_POOL_ADDRESS,
        functionName:
          type === 'sub' ? 'subscribeValidator' : 'unsubscribeValidator',
        args: [validatorId],
      })
    } catch (err) {
      console.error('Error unsubscribing validator:', err)
    }
  }, [validatorId, write])

  return {
    handleSubscription,
    awaitingWalletConfirmations,
    isConfirming,
    isReceiptSuccess,
    writeError,
    receiptError,
    hash,
  }
}
