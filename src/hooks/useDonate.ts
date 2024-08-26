import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'
import { utils } from 'ethers'
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi'

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

  const donate = async (ethAmount: string | undefined) => {
    try {
      await send({
        to: SMOOTHING_POOL_ADDRESS,
        value: ethAmount ? utils.parseEther(ethAmount).toBigInt() : undefined,
      })
    } catch (err) {
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
