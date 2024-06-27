import { DialogProps } from '../types'
import Link from 'next/link'
import {
  useAccount,
  useBalance,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { utils } from 'ethers'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/common/Button'
import { SELECTED_CHAIN, SMOOTHING_POOL_ADDRESS } from '@/utils/config'

const MIN_DONATION = 0.01

export function InitialDialog({
  handleClose,
  handleChangeDialogState,
}: DialogProps) {
  const [ethAmount, setEthAmount] = useState<string>('')
  const [isValueValid, setIsValueValid] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { address } = useAccount()
  const { data, isLoading } = useBalance({ address })

  const availableBalance = data?.value ? parseFloat(utils.formatEther(data.value)) : 0
  
  let blockExplorerUrl: string
  if (SELECTED_CHAIN === 'mainnet') {
    blockExplorerUrl = 'https://etherscan.io'
  }
  else {
    blockExplorerUrl = 'https://holesky.etherscan.io'
  }

  const { config } = usePrepareSendTransaction({
    to: SMOOTHING_POOL_ADDRESS,
    value: ethAmount && isValueValid ? utils.parseEther(ethAmount).toBigInt() : undefined,
  })

  const contractWrite = useSendTransaction(config)

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    onSuccess: () => handleChangeDialogState('success'),
  })

  const sanitizeInput = useCallback((value: string): string => {
    // Remove non-numeric characters except for the decimal point
    let sanitizedValue = value.replace(/[^0-9.]/g, '')

    // Remove leading zeros from the integer part
    sanitizedValue = sanitizedValue.replace(/^0+(?=\d)/, '')

    // Split the input by the decimal point
    const parts = sanitizedValue.split('.')

    // Reconstruct the sanitized value
    sanitizedValue = parts.join('.')

    // Ensure only one decimal point is present
    if (parts.length > 2) {
      sanitizedValue = `${parts[0]}.${parts.slice(1).join('')}`
    }

    // Ensure the input starts with a valid number
    if (sanitizedValue.startsWith('.')) {
      sanitizedValue = `0${sanitizedValue}`
    }

    // Limit to 8 characters
    return sanitizedValue.slice(0, 8)
  }, [])

  const validateAmount = useCallback((amount: string) => {
    const numericValue = parseFloat(amount)
    if (Number.isNaN(numericValue) || amount !== sanitizeInput(amount)) {
      setIsValueValid(false)
      setErrorMessage('Please enter a valid amount.')
    } else if (numericValue < MIN_DONATION) {
      setIsValueValid(false)
      setErrorMessage(`Only donations greater than or equal to ${MIN_DONATION} ETH are allowed.`)
    } else if (numericValue > availableBalance) {
      setIsValueValid(false)
      setErrorMessage('Insufficient balance.')
    } else {
      setIsValueValid(true)
      setErrorMessage('')
    }
  }, [sanitizeInput, availableBalance])

  useEffect(() => {
    if (ethAmount) validateAmount(ethAmount)
  }, [ethAmount, availableBalance, validateAmount])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeInput(e.target.value)
    setEthAmount(sanitizedValue)
    validateAmount(sanitizedValue)
  }

  return (
    <>
      <input
        className={`min-h-full w-full rounded-md border bg-DAppLight p-2 pl-4 [appearance:textfield] focus:outline-none dark:border-DAppDarkSurface/300 dark:bg-DAppDarkSurface/300 ${!isValueValid && 'border-red-500'}`}
        placeholder="0.01"
        min={0}
        type="text"
        value={ethAmount}
        onChange={handleChangeInput}
      />
      {!isValueValid && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
      <div className="mt-3 flex w-full items-center justify-between px-2 text-xs text-DAppDeep dark:text-DAppDarkText">
        <p className="flex items-center">
          Available:{' '}
          {isLoading ? (
            <span className="ml-2 inline-block h-4 w-16 animate-pulse rounded-md bg-gray-200 opacity-90 dark:bg-DAppDarkSurface/300" />
          ) : (
            `${data?.formatted} ${data?.symbol}`
          )}
        </p>
      </div>
      <div className="mt-6 flex w-full flex-col gap-y-5 rounded-lg bg-violet-50 p-4 text-sm font-normal text-DAppDeep dark:bg-DAppDarkSurface/300 dark:text-DAppDarkText">
        <div className="flex items-center justify-between">
          <p>Donation to Solo Stakers</p>
          <p>{ethAmount || '0'} {data?.symbol}</p>
        </div>
      </div>
      {waitForTransaction.isLoading ? (
        <div className="mt-6 w-full rounded-lg bg-violet-50 px-4 py-8 text-sm font-normal text-DAppDeep dark:bg-DAppDarkSurface/300 dark:text-DAppDarkText">
          <div className="mx-auto flex w-fit items-center">
            <AiOutlineInfoCircle />
            <p className="ml-2">Your donation is being processed.</p>
          </div>
          <div className="mx-auto mt-2 max-w-fit">
            <Link
              className="text-violet-500 underline dark:text-violet-200"
              href={`${blockExplorerUrl}/tx/${contractWrite.data?.hash}`}
              target="_blank">
              Check the transaction on block explorer
            </Link>
          </div>
        </div>
      ) : waitForTransaction.isError ? (
        <div className="px-8 text-center text-base text-red-500">
          <AiOutlineInfoCircle className="mx-auto h-8 w-8" />
          <h4 className="mt-4 font-bold">Donation error!</h4>
          <p className="mt-4 font-normal">
            Your donation has failed. Please go back and try again.
          </p>
          <h4 className="my-2 font-bold">Error:</h4>
          <div className="mb-4 h-32 overflow-scroll rounded-lg border border-red-400 p-2">
            {waitForTransaction.error?.message}
          </div>
        </div>
      ) : null}
      <Button
        className="mt-6"
        isDisabled={
          !contractWrite.sendTransaction ||
          ethAmount === '' ||
          !isValueValid ||
          waitForTransaction.isLoading
        }
        onPress={() => contractWrite.sendTransaction?.()}>
        Donate
      </Button>
      <Button
        buttonType="secondary"
        className="mt-4"
        isDisabled={waitForTransaction.isLoading}
        onPress={handleClose}>
        Cancel
      </Button>
    </>
  )
}