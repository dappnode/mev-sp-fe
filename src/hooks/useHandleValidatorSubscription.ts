import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import contractInterface from '@/contract/abi.json'
import { fetchConfig } from '@/client/api/queryFunctions'
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'
import { useEffect, useCallback } from 'react'
import { utils } from 'ethers'

/**
 * Hook used to handle and submit validator subscriptions and unsubscriptions
 */

export function useHandleValidatorSubscription(
  type: 'sub' | 'unsub',
  validatorId: number
) {
  const { address } = useAccount()
  const queryClient = useQueryClient()

  const abi = [...contractInterface] as const

  const configQuery = useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig,
  })

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
        value:
          type === 'sub'
            ? utils
                .parseUnits(configQuery.data?.collateralInWei || '0', 'wei')
                .toBigInt()
            : undefined,
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
    configQuery
  }
}
