import { DialogProps } from '../types'
import { useQuery } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import { fetchMultiValidatorRegisteredRelays } from '@/client/api/queryFunctions'
import { shortenEthAddress } from '@/utils/web3'

interface MultiInitialDialogProps extends DialogProps {
  validatorKeys: `0x${string}`[]
}

interface ValidatorListProps {
  validatorKeys: string[]
  handleClose: () => void // Add handleClose as a function type
}

function NotRegisteredValidators({
  validatorKeys,
  handleClose,
}: ValidatorListProps): JSX.Element {
  return (
    <div className="validator-info bg-orange-200 rounded-lg mb-20 p-4 mt-6">
      <p>The following validator(s) are not subscribed to any MEV relays:</p>
      <div className="mt-2 h-32 overflow-y-auto">
        <ul>
          {validatorKeys.map((key) => (
            <li key={key} className="text-gray-500 font-bold">
              {shortenEthAddress(key)}
            </li>
          ))}
        </ul>
      </div>
      <Button className="mt-4" onPress={handleClose}>
        Go Back
      </Button>
    </div>
  )
}

function NotCorrectlyRegisteredValidators({
  validatorKeys,
  handleClose,
}: ValidatorListProps): JSX.Element {
  return (
    <div className="validator-info bg-red-200 rounded-lg mb-20 p-4 mt-6">
      <p>
        For the following validator(s), the fee recipient is not correctly set
        to Smooth:
      </p>
      <div className="mt-2 h-32 overflow-y-auto">
        <ul>
          {validatorKeys.map((key) => (
            <li key={key} className="text-gray-500 font-bold">
              {shortenEthAddress(key)}
            </li>
          ))}
        </ul>
      </div>
      <Button className="mt-4" onPress={handleClose}>
        Go Back
      </Button>
    </div>
  )
}

function AllValidatorsRegistered({
  handleChangeDialogState,
}: {
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleChangeDialogState: Function
}): JSX.Element {
  return (
    <div className="validator-info bg-green-200 rounded-lg mb-20 p-4 mt-6">
      <p>
        Great! All your validators are registered to MEV relays and their fee
        recipient is set to Smooth!
      </p>
      <Button
        className="mt-4"
        onPress={() => handleChangeDialogState('confirm')}>
        Subscribe to Smooth!
      </Button>
    </div>
  )
}

function Loading(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center mb-20">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        className="loader"
        style={{
          border: '5px solid #f3f3f3', // Light grey
          borderTop: '5px solid #3498db', // Blue
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 2s linear infinite',
        }}
      />

      <p className="text-center mt-2 bg-gray-200 rounded-lg p-4">
        Please wait while we are checking all your selected validator&#39;s fee
        recipients. This may take up to few minutes.
      </p>
    </div>
  )
}

export function MultiInitialDialog({
  steps,
  handleChangeDialogState,
  handleClose,
  validatorKeys,
}: MultiInitialDialogProps) {
  const registeredRelaysQuery = useQuery({
    queryKey: ['multiregistered-relays'],
    queryFn: () => fetchMultiValidatorRegisteredRelays(validatorKeys),
  })

  const [notRegisteredValidatorKeys, setNotRegisteredValidatorKeys] = useState<string[]>([])
  const [notCorrectlyRegisteredValidatorKeys,setNotCorrectlyRegisteredValidatorKeys] = useState<string[]>([])

  useEffect(() => {
    if (registeredRelaysQuery.isSuccess && registeredRelaysQuery.data) {
      const notRegisteredKeys: string[] = []
      const notCorrectlyRegisteredKeys: string[] = []
      registeredRelaysQuery.data.forEach((validatorData, index) => {
        const notRegisteredtoAnyRelay =
          validatorData.correctFeeRelayers === null &&
          validatorData.wrongFeeRelayers === null
        const registeredButNoCorrectRelays =
          validatorData.correctFeeRelayers === null &&
          validatorData.wrongFeeRelayers !== null

        if (notRegisteredtoAnyRelay) {
          notRegisteredKeys.push(validatorKeys[index])
        } else if (registeredButNoCorrectRelays) {
          notCorrectlyRegisteredKeys.push(validatorKeys[index])
        }
      })

      setNotRegisteredValidatorKeys(notRegisteredKeys)
      setNotCorrectlyRegisteredValidatorKeys(notCorrectlyRegisteredKeys)
    }
  }, [
    registeredRelaysQuery.isSuccess,
    registeredRelaysQuery.data,
    validatorKeys,
  ])

  // Inside MultiInitialDialog component
  let content
  if (registeredRelaysQuery.isLoading) {
    content = <Loading />
  } else if (notRegisteredValidatorKeys.length > 0) {
    content = (
      <NotRegisteredValidators
        handleClose={handleClose}
        validatorKeys={notRegisteredValidatorKeys}
      />
    )
  } else if (notCorrectlyRegisteredValidatorKeys.length > 0) {
    content = (
      <NotCorrectlyRegisteredValidators
        handleClose={handleClose}
        validatorKeys={notCorrectlyRegisteredValidatorKeys}
      />
    )
  } else {
    content = (
      <AllValidatorsRegistered
        handleChangeDialogState={handleChangeDialogState}
      />
    )
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
      <ul className="sm:px-6">{content}</ul>
    </>
  )
}
