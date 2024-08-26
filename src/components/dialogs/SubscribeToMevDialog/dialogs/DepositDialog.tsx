import { DialogProps } from '../types'
import Link from 'next/link'
import { type BaseError, useAccount } from 'wagmi'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useEffect } from 'react'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import { Tooltip } from '@/components/common/Tooltip'
import { weiToEth } from '@/utils/web3'
import { useHandleSubscriptionStatus } from '@/hooks/useHandleSubscriptionStatus'

interface DepositDialogProps extends DialogProps {
  validatorId: number
  setShowCloseButton: (show: boolean) => void
}

export function DepositDialog({
  steps,
  validatorId,
  setShowCloseButton,
  handleClose,
  handleChangeDialogState,
}: DepositDialogProps) {
  const { chain } = useAccount()

  const {
    handleSubscription,
    awaitingWalletConfirmations,
    isConfirming,
    isReceiptSuccess,
    writeError,
    receiptError,
    hash,
    configQuery,
  } = useHandleSubscriptionStatus('sub', validatorId)

  useEffect(() => setShowCloseButton(false), [setShowCloseButton])

  useEffect(() => {
    if (isReceiptSuccess) {
      setShowCloseButton(true)
      handleChangeDialogState('success')
    }
  }, [isReceiptSuccess, handleChangeDialogState, setShowCloseButton])

  return (
    <>
      <div className="-mt-2 text-DAppDeep dark:text-DAppDarkText">
        <h3 className="mb-6 text-left text-2xl font-bold">Deposit</h3>
        <StepProgressBar currentStep={2} steps={steps} />
      </div>
      <div className="flex h-full flex-1 flex-col text-DAppDeep dark:text-DAppDarkText">
        {!writeError &&
          !receiptError &&
          !awaitingWalletConfirmations &&
          !isConfirming && (
            <div className="flex flex-1 flex-col items-center justify-center ">
              <p className="text-center text-lg">
                To subscribe and start earning rewards, please deposit
              </p>
              {configQuery.isLoading ? (
                <div className="animate-pulse rounded bg-SkeletonGray p-5 dark:bg-DAppDarkSurface-300">
                  Loading
                </div>
              ) : (
                <p className="text-2xl font-bold">
                  {weiToEth(configQuery.data?.collateralInWei)} ETH
                </p>
              )}

              <div className="mt-4 flex items-center justify-center text-lg font-normal tracking-wide">
                <p>to Smooth </p>{' '}
                <Link
                  className="ml-2 flex items-center"
                  href="https://docs.dappnode.io/docs/smooth"
                  rel="noopener noreferrer"
                  target="_blank">
                  <Tooltip
                    iconType="question"
                    tooltip="To learn more about the required collateral for Smooth, click the ?"
                  />
                </Link>
              </div>
            </div>
          )}

        {awaitingWalletConfirmations ? (
          <div className=" flex  flex-1 flex-col items-center justify-center sm:flex-col">
            <div className="flex w-fit animate-pulse flex-col items-center justify-center gap-3 rounded bg-violet-200 p-5 dark:bg-DAppDarkSurface-300 sm:flex-row">
              <AiOutlineInfoCircle />
              <p>Awaiting wallet confirmation.</p>
            </div>
          </div>
        ) : isConfirming ? (
          <div className="flex w-full flex-1 flex-col items-center justify-center">
            <div className="flex w-fit animate-pulse flex-col items-center justify-center gap-3 rounded bg-violet-200 p-5 dark:bg-DAppDarkSurface-300 sm:flex-row">
              <AiOutlineInfoCircle />
              <p>Your deposit is being processed.</p>
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
          <div className="flex flex-1  flex-col justify-between">
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

            <div className="flex flex-1 flex-col justify-end">
              <Button
                onPress={handleSubscription}
                isDisabled={awaitingWalletConfirmations || isConfirming}>
                {writeError ? 'Try again' : 'Deposit'}
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
    </>
  )
}
