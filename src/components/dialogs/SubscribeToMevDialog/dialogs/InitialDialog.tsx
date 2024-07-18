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
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'
import { useState } from 'react'

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
    registeredRelaysQuery.data?.correctFeeRelayers === null &&
    registeredRelaysQuery.data?.wrongFeeRelayers === null

  const noCorrectFeeRelayers =
    registeredRelaysQuery.data?.correctFeeRelayers === null ||
    registeredRelaysQuery.data?.correctFeeRelayers === undefined

  const handleNext = () => {
    if (!isCorrectFeeRecipient) {
      handleClose()
    } else {
      handleChangeDialogState('confirm')
    }
  }

  const renderLoadingOrError = () => {
    if (registeredRelaysQuery.isFetching) {
      return (
        <div>
          <h4 className="text-center">Checking MevBoost relays...</h4>
          <div className="mx-auto mt-8 h-10 w-80 animate-pulse rounded bg-SkeletonGray dark:bg-DAppDarkSurface/300" />
        </div>
      )
    }
    if (registeredRelaysQuery.isError) {
      return <div>Error when trying to fetch validator&#39;s Fee recipient</div>
    }
    return null
  }

  const renderMevOpportunitiesSection = () => {
    if (registeredRelaysQuery.isError) {
      return <div>Error when trying to fetch validator&#39;s Fee recipient</div>
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

    const [smoothFeeCopied, setSmoothFeeCopied] = useState(false)

    const handleCopyAddress = (
      e:
        | React.MouseEvent<HTMLSpanElement, MouseEvent>
        | React.KeyboardEvent<HTMLSpanElement>
    ): void => {
      e.preventDefault()
      if (
        e.type === 'click' ||
        (e.type === 'keydown' &&
          (e as React.KeyboardEvent<HTMLSpanElement>).key === 'Enter')
      ) {
        navigator.clipboard.writeText(SMOOTHING_POOL_ADDRESS)
        setSmoothFeeCopied(true)
        setTimeout(() => {
          setSmoothFeeCopied(false)
        }, 2000)
      }
    }

    if (!registeredRelaysQuery.isLoading && noCorrectFeeRelayers === true) {
    return (
      <>
        <div className="mt-6 overflow-auto text-center text-base text-red-500">
          <AiOutlineInfoCircle className="mx-auto h-8 w-8" />
          <h4 className="font-bold mt-2">
            Alert: This validator&#39;s fee recipient is not set to Smooth!
            Please update your fee recipient.
            <br />
            <br />
            <div className="flex justify-center text-black dark:text-DAppDarkText ">
              <div
                className="hover:underline cursor-pointer flex"
                onClick={handleCopyAddress}>
                <span className="text-[0.6rem] md:text-sm lg:text-base">
                  {SMOOTHING_POOL_ADDRESS.substring(0, 8) +
                    '...' +
                    SMOOTHING_POOL_ADDRESS.substring(
                      SMOOTHING_POOL_ADDRESS.length - 8
                    )}
                </span>

                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {smoothFeeCopied && (
                  <span className="ml-2 text-base text-green-600">Copied!</span>
                )}
              </div>
            </div>
            <br />
            Check out{' '}
            <Link
              className="inline font-medium underline-offset-2 hover:underline"
              href="https://docs.dappnode.io/docs/smooth"
              rel="noopener noreferrer"
              target="_blank">
              Smooth Docs ↗
            </Link>{' '}
          </h4>
        </div>
      </>
    )
    }
    if (!registeredRelaysQuery.isLoading && !isCorrectFeeRecipient) {
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
              using these relays anymore. Your validator will be{' '}
              <strong>BANNED</strong> from Smooth if it uses a relay with an
              incorrect fee recipient.
          </p>
          <p className="mt-6 text-sm">
            If you have already changed your fee recipient and this warning is
            still appearing,{' '}
            <Link
              className="underline hover:text-blue-600"
              href="https://docs.dappnode.io/docs/smooth/subscribe-to-smooth/manual" // Replace with dappnode docs fee recipient section
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
    if (!registeredRelaysQuery.isLoading && isCorrectFeeRecipient) {
      return (
        <div className="mt-4 text-lg font-semibold">
          Great, this validator is already registered to MEV relays 
          and its fee recipient is set to Smooth!
        </div>
      )
    }
    return null
  }

  return (
    <>
      <Toaster />
      <div className="-mt-2 text-DAppDeep dark:text-DAppDarkText">
        <h3 className="mb-6 text-left text-2xl font-bold">
          Fee Recipient Check
        </h3>
        <StepProgressBar currentStep={0} steps={steps} />
      </div>
      <div className="sm:px-6">
        <div>
          <h4 className="mb-2 text-DAppNeutral/500 dark:text-DAppDarkText">
            Validator
          </h4>
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
      ) : noCorrectFeeRelayers === true ? (
        <div>
          <Button
            isDisabled={registeredRelaysQuery.isLoading}
            onPress={handleClose}>
            I will update my fee recipient to Smooth address.
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
          <Button className="h-17 px-4 ml-2" onPress={handleClose}>
            I will change my Fee Recipient
          </Button>
          <Button
            buttonType="secondary"
            className="h-17 px-4 ml-5"
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
