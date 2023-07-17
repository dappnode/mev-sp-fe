import { DialogProps } from '../types'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import CopyToClipboard from 'react-copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast'
import { FaCopy } from 'react-icons/fa'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import {
  fetchConfig,
  fetchValidatorRegisteredRelays,
} from '@/client/api/queryFunctions'
import { shortenEthAddress } from '@/utils/web3'

interface InitialDialogProps extends DialogProps {
  validatorKey: `0x${string}`
}

export function InitialDialog({
  steps,
  handleChangeDialogState,
  handleClose,
  validatorKey,
}: InitialDialogProps) {
  const configQuery = useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig,
  })

  const registeredRelaysQuery = useQuery({
    queryKey: ['registered-relays'],
    queryFn: () => fetchValidatorRegisteredRelays(validatorKey),
  })

  const isCorrectFeeRecipient = registeredRelaysQuery.data?.correctFeeRecipients

  const handleNext = () => {
    if (!isCorrectFeeRecipient) {
      handleClose()
    } else {
      handleChangeDialogState('confirm')
    }
  }

  return (
    <>
      <Toaster />
      <div className="-mt-2 text-DAppDeep">
        <h3 className="mb-6 text-left text-2xl font-bold">Warning</h3>
        <StepProgressBar currentStep={0} steps={steps} />
      </div>
      <div className="sm:px-6">
        <div>
          <h4 className="mb-2 text-DAppNeutral/500">Your Validator</h4>
          <p className="h-8 overflow-scroll">
            {shortenEthAddress(validatorKey, 16, 16)}
          </p>
        </div>
        {registeredRelaysQuery.isLoading ||
        registeredRelaysQuery.data?.correctFeeRecipients ? (
          <>
            <div className="mt-8">
              <h4 className="mb-2 text-DAppNeutral/500">
                Current Fee Recipient address
              </h4>
              {registeredRelaysQuery.isLoading ? (
                <div className="h-8 w-96 animate-pulse rounded bg-SkeletonGray" />
              ) : (
                <p className="h-8 overflow-scroll">
                  {shortenEthAddress(
                    registeredRelaysQuery.data?.correctFeeRelayers?.[0]
                      .feeRecipient,
                    16,
                    16
                  )}
                </p>
              )}
            </div>
            <div className="mt-4 font-semibold">
              {!registeredRelaysQuery.isLoading &&
                'Great, your fee recipient is already set to the MEV Smoothing Pool!'}
            </div>
          </>
        ) : (
          <div className="mt-6 overflow-auto text-center text-base text-red-500">
            <AiOutlineInfoCircle className="mx-auto h-8 w-8" />
            <h4 className="mt-3 font-bold">Fee recipient error!</h4>
            <p className="mt-2 font-normal">
              The fee recipient address is not set as{' '}
              <CopyToClipboard
                text={configQuery.data?.poolAddress || ''}
                onCopy={() =>
                  toast('Address copied to clipboard', { icon: '✂️' })
                }>
                <div className="flex cursor-pointer items-center justify-center">
                  <span className="overflow-scroll font-semibold">
                    {shortenEthAddress(configQuery.data?.poolAddress, 16, 16)}
                  </span>
                  <FaCopy className="ml-1 h-4 w-4" />
                </div>
              </CopyToClipboard>{' '}
              Please{' '}
              <Link
                className="inline font-medium underline-offset-2 hover:underline"
                href="https://usedappnode.notion.site/How-to-change-your-fee-recipient-85ca6d30bfba4ae1a093d5e63e09c9e8"
                rel="noopener noreferrer"
                target="_blank">
                follow these instructions ↗
              </Link>{' '}
              to change the fee recipient and try again.
            </p>
          </div>
        )}
      </div>
      <div>
        <Button
          isDisabled={registeredRelaysQuery.isLoading}
          onPress={handleNext}>
          {registeredRelaysQuery.isLoading || isCorrectFeeRecipient
            ? 'Next'
            : 'I will change the Fee Recipient in my validator'}
        </Button>
        {(registeredRelaysQuery.isLoading || isCorrectFeeRecipient) && (
          <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
            Cancel
          </Button>
        )}
      </div>
    </>
  )
}
