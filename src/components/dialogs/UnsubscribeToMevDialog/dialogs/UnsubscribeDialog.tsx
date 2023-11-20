import { DialogProps } from '../types'
import Link from 'next/link'
import {
  useAccount,
  useNetwork,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import { useQueryClient } from '@tanstack/react-query'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import contractInterface from '@/contract/abi.json'
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'

interface UnsubscribeDialogProps extends DialogProps {
  validatorId: number
  setShowCloseButton: (show: boolean) => void
}

export function UnsubscribeDialog({
  steps,
  validatorId,
  setShowCloseButton,
  handleChangeDialogState,
  handleClose,
}: UnsubscribeDialogProps) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const queryClient = useQueryClient()

  const abi = [...contractInterface] as const

  const contractWrite = useContractWrite({
    address: SMOOTHING_POOL_ADDRESS,
    abi,
    mode: 'recklesslyUnprepared',
    functionName: 'unsubscribeValidator',
    args: [validatorId],
    onSuccess: () => {
      setShowCloseButton(false)
    },
  })

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    confirmations: 2,
    onSuccess: () => {
      setShowCloseButton(true)
      handleChangeDialogState('success')
      queryClient.invalidateQueries({
        queryKey: ['validators', address],
      })
    },
  })

  return (
    <>
      <div className="-mt-2 text-DAppDeep">
        <h3 className="mb-6 text-left text-2xl font-bold">Unsubscribe</h3>
        <StepProgressBar currentStep={3} steps={steps} />
      </div>
      {!waitForTransaction.isError ? (
        <div className="text-center">
          <h4 className="text-lg font-normal">
            You are unsubscribing from Smooth
          </h4>
          {waitForTransaction.isLoading && (
            <div className="mt-6 w-full rounded-lg bg-violet-50 px-4 py-8 text-sm font-normal text-DAppDeep">
              <div className="mx-auto mb-2 flex w-fit flex-col items-center sm:flex-row">
                <AiOutlineInfoCircle />
                <p className="ml-2 mt-1 sm:mt-0">
                  Your unsubscription is being processed.
                </p>
              </div>
              <div className="mx-auto mt-2 max-w-fit">
                <Link
                  className=" text-violet-500 underline"
                  href={`${chain?.blockExplorers?.default.url}/tx/${contractWrite.data?.hash}`}
                  target="_blank">
                  Check the transaction on block explorer
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-2 text-center text-base text-red-500 md:px-8">
          <AiOutlineInfoCircle className="mx-auto h-8 w-8" />
          <h4 className="mt-1 font-bold">Unsubscription error!</h4>
          <p className="mt-1 font-normal">
            Your unsubscription has failed. Please go back and try again.
          </p>
          <h4 className="my-1 font-bold">Error:</h4>
          <div className="mb-4 h-32 overflow-scroll rounded-lg border border-red-400 p-2">
            {waitForTransaction.error?.message}
          </div>
        </div>
      )}
      <div>
        {!waitForTransaction.isLoading && (
          <>
            <Button
              isDisabled={contractWrite.isLoading}
              onPress={() => contractWrite.write?.()}>
              {waitForTransaction.isError ? 'Try again' : 'Unsubscribe'}
            </Button>
            <Button
              buttonType="secondary"
              className="mt-4"
              onPress={handleClose}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </>
  )
}
