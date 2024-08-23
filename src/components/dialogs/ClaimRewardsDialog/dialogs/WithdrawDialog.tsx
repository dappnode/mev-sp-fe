import { DialogProps } from '../types'
import Link from 'next/link'
import { BaseError, useAccount } from 'wagmi'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Button } from '@/components/common/Button'
import { toFixedNoTrailingZeros } from '@/utils/decimals'
import { useEffect } from 'react'
import { useClaimRewards } from '@/hooks/useClaimRewards'

interface WithdrawDialogProps extends DialogProps {
  claimableRewards: number
}

export function WithdrawDialog({
  claimableRewards,
  handleClose,
  handleChangeDialogState,
}: WithdrawDialogProps) {
  const { chain } = useAccount()

  const {
    claimRewards,
    awaitingWalletConfirmations,
    isConfirming,
    isReceiptSuccess,
    writeError,
    receiptError,
    hash,
  } = useClaimRewards()

  useEffect(() => {
    if (isReceiptSuccess) handleChangeDialogState('success')
  }, [isReceiptSuccess])

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center text-DAppDeep dark:text-DAppDarkText ">
      {awaitingWalletConfirmations ? (
        <div className="flex w-fit animate-pulse flex-col items-center justify-center gap-3 rounded bg-violet-200 p-5 dark:bg-DAppDarkSurface-300 sm:flex-row">
          <AiOutlineInfoCircle />
          <p>Awaiting wallet confirmation.</p>
        </div>
      ) : isConfirming ? (
        <div className="mx-auto mb-2 mt-2 flex w-fit flex-col items-center sm:flex-col">
          <div className="flex w-fit animate-pulse flex-col items-center justify-center gap-3 rounded bg-violet-200 p-5 dark:bg-DAppDarkSurface-300 sm:flex-row">
            <AiOutlineInfoCircle />
            <p>Your withdrawal is being processed.</p>
          </div>
          <div className="mx-auto mt-2 max-w-fit">
            <Link
              className="text-violet-500 underline dark:text-violet-200"
              href={`${chain?.blockExplorers?.default.url}/tx/${hash}`}
              target="_blank">
              Check the transaction on block explorer
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-1  flex-col justify-between w-full">
          {writeError && (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center text-lg">
              <p className="rounded bg-violet-200 p-5 dark:bg-DAppDarkSurface-300">
                An error occurred while sending the transaction. Please try
                again.
              </p>

              <div className="text-DAppRed">
                Error:{' '}
                {(writeError as BaseError).shortMessage || writeError.message}
              </div>
            </div>
          )}

          {receiptError && (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center text-lg">
              <p className="rounded bg-violet-200 p-5 dark:bg-DAppDarkSurface-300">
                An error occurred while confirming the transaction. Please try
                again.
              </p>
              {receiptError && (
                <div className="text-DAppRed">
                  Error:{' '}
                  {(receiptError as BaseError).shortMessage ||
                    receiptError.message}
                </div>
              )}
            </div>
          )}

          {!writeError &&
            !receiptError &&
            !awaitingWalletConfirmations &&
            !isConfirming && (
              <>
                <div className="flex flex-1 flex-col items-center justify-center ">
                  <h3 className="text-lg font-normal">You are withdrawing</h3>
                  <p className="mt-4 text-2xl font-bold">
                    {toFixedNoTrailingZeros(claimableRewards, 4)} ETH
                  </p>
                  <p className="mt-4 text-lg font-normal tracking-wide">
                    to your recipient wallet address
                  </p>
                </div>
              </>
            )}

          {isReceiptSuccess && (
            <p className="text-left text-lg">
              Your unsubscription has been processed.
            </p>
          )}
          <div className="flex flex-col w-full">
            <Button
              onPress={claimRewards}
              isDisabled={awaitingWalletConfirmations || isConfirming}>
              Unsubscribe
            </Button>
            <Button
              buttonType="secondary"
              className="mt-4"
              onPress={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
