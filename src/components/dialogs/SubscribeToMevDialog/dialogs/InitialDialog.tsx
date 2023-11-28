import { DialogProps } from '../types'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import CopyToClipboard from 'react-copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast'
import { FaCopy } from 'react-icons/fa'
import { RxDotFilled } from 'react-icons/rx'
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
  const noMevRelays =
    registeredRelaysQuery.data?.correctFeeRelayers?.length === 0 &&
    registeredRelaysQuery.data?.wrongFeeRelayers?.length === 0

  const handleNext = () => {
    if (!isCorrectFeeRecipient) {
      handleClose()
    } else {
      handleChangeDialogState('confirm')
    }
  }

  const renderLoadingOrError = () => {
    if (registeredRelaysQuery.isLoading) {
      return (
        <div>
          <h4 className="text-center">Checking MevBoost relays...</h4>
          <div className="mx-auto mt-8 h-10 w-80 animate-pulse rounded bg-SkeletonGray" />
        </div>
      )
    }
    if (registeredRelaysQuery.isError) {
      return (
        <div>Error when trying to fetch validator&#39;s Fee recipient</div>
      )
    }
    return null
  }

  const renderMevOpportunitiesSection = () => {
    if (registeredRelaysQuery.isError) {
      return (
        <div>Error when trying to fetch validator&#39;s Fee recipient</div>
      )
    }
    const relays = isCorrectFeeRecipient
      ? registeredRelaysQuery.data?.correctFeeRelayers
      : registeredRelaysQuery.data?.wrongFeeRelayers

    const title = isCorrectFeeRecipient
      ? 'Receiving MEV opportunities from'
      : "Does not have Smooth's address as Fee Recipient in:"

    return (
      <div>
        <h4 className="mb-2 text-DAppNeutral/500">{title}</h4>
        <div style={{ maxHeight: '80px', overflowY: 'auto' }}>
          {' '}
          {/* Adjust maxHeight as needed */}
          <ul>
            {relays?.map(({ relayAddress }) => (
              <li key={relayAddress} className="flex items-center">
                <RxDotFilled
                  className={`-ml-1 h-6 w-6 ${
                    isCorrectFeeRecipient ? 'text-green-500' : 'text-red-500'
                  }`}
                />
                {relayAddress}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  const renderRelayStatus = () => {
    if (!registeredRelaysQuery.isLoading && noMevRelays) {
      return (
        <div className="mt-6 overflow-auto text-center text-base text-orange-500">
          <AiOutlineInfoCircle className="mx-auto h-8 w-8" />{' '}
          <h4 className="font-bold mt-2">
            You are not registered to any MEV relays yet. Subscribe to MEV
            relays to start using Smooth!
          </h4>
        </div>
      )
    }
    if (!isCorrectFeeRecipient) {
      return (
        <div>
          <div className="mt-2">{renderMevOpportunitiesSection()}</div>
          <div className="mt-6 overflow-auto text-center text-base text-orange-500">
            <div className="flex items-center justify-center">
              <AiOutlineInfoCircle className="h-8 w-8 mr-2" />{' '}
              {/* Align the icon with the text */}
              <h4 className="font-bold">Fee recipient warning!</h4>
            </div>
            <p className="mt-2 font-normal">
              This validator&#39;s fee recipient is not{' '}
              <CopyToClipboard
                text={configQuery.data?.poolAddress || ''}
                onCopy={() =>
                  toast('Address copied to clipboard', { icon: '✂️' })
                }>
                <div className="flex cursor-pointer items-center justify-center">
                  <span className="font-semibold">
                    {shortenEthAddress(configQuery.data?.poolAddress, 10, 10)}
                  </span>
                  <FaCopy className="ml-1 h-4 w-4" />
                </div>
              </CopyToClipboard>{' '}
              in one or more MEV relays. Please change your fee recipient in
              your dappnode&#39;s{' '}
              <Link
                className="inline font-medium underline-offset-2 hover:underline"
                href="http://brain.web3signer.dappnode/"
                rel="noopener noreferrer"
                target="_blank">
                Staking Brain ↗
              </Link>{' '}
              for this validator and try again, or make sure you&#39;re not
              using these relays anymore. Your validator will be <strong>BANNED</strong> from Smooth if it uses a relay with an incorrect fee recipient.
            </p>
            <p className="mt-6 text-sm">
              If you have already changed your fee recipient and this warning is still appearing,{' '}
              <Link
                className="underline hover:text-blue-600"
                href="http://example.com" // Replace with dappnode docs fee recipient section
                rel="noopener noreferrer"
                target="_blank">
                click here
              </Link>{' '}
              for more information.
            </p>
          </div>
        </div>
      )
    }
    if (isCorrectFeeRecipient) {
      return (
        <div className="mt-4 text-lg font-semibold">
          Great, you are already registered to MEV relays and your
          validator&#39;s fee recipient is set to Smooth!
        </div>
      )
    }
    return null
  }

  return (
    <>
      <Toaster />
      <div className="-mt-2 text-DAppDeep">
        <h3 className="mb-6 text-left text-2xl font-bold">
          Fee Recipient Check
        </h3>
        <StepProgressBar currentStep={0} steps={steps} />
      </div>
      <div className="sm:px-6">
        <div>
          <h4 className="mb-2 text-DAppNeutral/500">Your Validator</h4>
          <p className="h-8">{shortenEthAddress(validatorKey, 16, 16)}</p>
        </div>
        {renderLoadingOrError() || renderRelayStatus()}
      </div>

      {noMevRelays ? (
        <div>
          <Button
            isDisabled={registeredRelaysQuery.isLoading}
            onPress={handleClose}>
            I will register to MEV relays
          </Button>
          <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
            Cancel
          </Button>
        </div>
      ) : registeredRelaysQuery.isLoading || isCorrectFeeRecipient ? (
        <div>
          <Button
            isDisabled={registeredRelaysQuery.isLoading}
            onPress={handleNext}>
            Next
          </Button>
          <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex justify-between mt-4 ">
          <Button
            className="h-17 px-4 ml-2" // Adjust height, padding, and margin for smaller buttons and space between them
            onPress={handleClose}>
            I will change my Fee Recipient
          </Button>
          <Button
            buttonType="secondary"
            className="h-17 px-4 ml-5" // Adjust height and padding for smaller buttons
            isDisabled={registeredRelaysQuery.isLoading}
            onPress={() => {
              handleChangeDialogState('confirm')
            }}>
            Continue to subscription anyways
          </Button>
        </div>
      )}
    </>
  )
}
