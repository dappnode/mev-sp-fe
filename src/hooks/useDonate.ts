import { utils } from 'ethers'
import {
    useAccount,
    useBalance,
    useSendTransaction,
    useWaitForTransactionReceipt,
} from 'wagmi'
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'

export function useDonate() {
  const { address } = useAccount()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({ address })

  const availableBalance = balance?.value
    ? parseFloat(utils.formatEther(balance.value))
    : 0

  const {
    sendTransactionAsync: send,
    isPending: awaitingWalletConfirmations,
    data: hash,
    error: sendError,
  } = useSendTransaction()

  const {
    isLoading: isConfirming,
    isSuccess: isReceiptSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({ hash })

  const donate = async (ethAmount: string ) => {
    try {
      await send({
        to: SMOOTHING_POOL_ADDRESS,
        value: utils.parseEther(ethAmount).toBigInt(),
      })
    } catch (err) {
      /* eslint-disable no-console */
      console.error('Error while donating:', err)
    }
  }

  return {
    availableBalance,
    isBalanceLoading,
    balance,
    donate,
    awaitingWalletConfirmations,
    hash,
    sendError,
    isConfirming,
    isReceiptSuccess,
    receiptError,
  }
}
