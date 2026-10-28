import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { formatEther } from 'ethers'
import { useEffect, useCallback } from 'react'
import contractInterface from '@/contract/abi.json'
import { fetchConfig } from '@/client/api/queryFunctions'
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'

/**
 * Hook used to handle and submit validator subscriptions and unsubscriptions
 */

export function useHandleSubscriptionStatus(
  methodName: 'sub' | 'unsub',
  validatorIds: number | number[]
) {
  const isMultiAction = Array.isArray(validatorIds)
  const { address } = useAccount()
  const queryClient = useQueryClient()

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
      queryClient.invalidateQueries({ queryKey: ['user-validators', address] })
    }
  }, [isReceiptSuccess, address, queryClient])

  const collateralInWei = BigInt(configQuery.data?.collateralInWei ?? '0')

  // Multiply the collateral by the number of validator IDs
  const totalDepositValue = isMultiAction
    ? collateralInWei * BigInt(validatorIds.length)
    : collateralInWei
  const totalDepositInString = formatEther(totalDepositValue)

  const handleSubscription = useCallback(async () => {
    const abi = [...contractInterface] as const

    try {
      await write({
        abi,
        address: SMOOTHING_POOL_ADDRESS,
        functionName:
          methodName === 'sub'
            ? isMultiAction
              ? 'subscribeValidators'
              : 'subscribeValidator'
            : methodName === 'unsub'
              ? isMultiAction
                ? 'unsubscribeValidators'
                : 'unsubscribeValidator'
              : '',
        value: methodName === 'sub' ? totalDepositValue : undefined,
        args: [validatorIds],
      })
    } catch (err) {
      /* eslint-disable no-console */
      console.error('Error unsubscribing validator:', err)
    }
  }, [validatorIds, write, isMultiAction, totalDepositValue, methodName])

  return {
    handleSubscription,
    awaitingWalletConfirmations,
    isConfirming,
    isReceiptSuccess,
    writeError,
    receiptError,
    hash,
    configQuery,
    totalDepositInString,
  }
}
