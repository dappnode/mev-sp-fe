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
import {
  SMOOTHING_POOL_ADDRESS,
  UNSUB_FEEDBACK_SCRIPT_URL,
  SELECTED_CHAIN,
} from '@/utils/config'

interface UnsubscribeDialogProps extends DialogProps {
  validatorId: number
  setShowCloseButton: (show: boolean) => void
  selectedOptions: string[]
  otherOption: string
  otherOptionSelected: boolean
  improvementsFeedback: string
}

export function UnsubscribeDialog({
  steps,
  validatorId,
  setShowCloseButton,
  handleChangeDialogState,
  handleClose,
  selectedOptions,
  otherOptionSelected,
  otherOption,
  improvementsFeedback,
}: UnsubscribeDialogProps) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const queryClient = useQueryClient()

  const feedbackScriptURL = UNSUB_FEEDBACK_SCRIPT_URL || ''
  const postFeedbackData = async () => {
    const formData = new FormData()
    formData.append('network', SELECTED_CHAIN)
    formData.append('validator-id', validatorId.toString())
    formData.append('why-options', selectedOptions.join('\n'))
    formData.append('other-options', otherOptionSelected ? otherOption : '')
    formData.append('improvements', improvementsFeedback)

    const timestamp = new Date().toISOString()
    formData.append('timestamp', timestamp)

    if (feedbackScriptURL) {
      try {
        const response = await fetch(feedbackScriptURL, {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()
          console.log('Feedback send:', result)
        } else {
          const errorText = await response.text()
          console.error('Error sending feedback:', errorText)
        }
      } catch (error) {
        console.error('Error fetching feedback :', error)
      }
    }
  }

  const abi = [...contractInterface] as const

  const contractWrite = useContractWrite({
    address: SMOOTHING_POOL_ADDRESS,
    abi,
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
      postFeedbackData()
      handleChangeDialogState('success')
      queryClient.invalidateQueries({
        queryKey: ['validators', address],
      })
    },
  })

  return (
    <>
      <div className="-mt-2 text-DAppDeep dark:text-DAppDarkText">
        <h3 className="mb-6 text-left text-2xl font-bold">Unsubscribe</h3>
        <StepProgressBar currentStep={2} steps={steps} />
      </div>
      {!waitForTransaction.isError ? (
        <div className="text-center text-DAppDeep dark:text-DAppDarkText">
          <h4 className="text-lg font-normal">
            You are unsubscribing validator <b>{validatorId}</b> from Smooth.
          </h4>
          {waitForTransaction.isLoading && (
            <div className="mt-6 w-full rounded-lg bg-violet-50 px-4 py-8 text-sm font-normal dark:bg-DAppDarkSurface-300 dark:text-DAppDarkText">
              <div className="mx-auto mb-2 flex w-fit flex-col items-center sm:flex-row">
                <AiOutlineInfoCircle />
                <p className="ml-2 mt-1 sm:mt-0">
                  Your unsubscription is being processed.
                </p>
              </div>
              <div className="mx-auto mt-2 max-w-fit">
                <Link
                  className=" text-violet-500 underline dark:text-violet-200"
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
