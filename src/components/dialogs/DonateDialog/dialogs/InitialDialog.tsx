import { DialogProps } from '../types'
import Link from 'next/link'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { utils } from 'ethers'
import { useState, useEffect, useCallback } from 'react'
import { BaseError } from 'wagmi'
import { Button } from '@/components/common/Button'
import { SELECTED_CHAIN } from '@/utils/config'
import { useDonate } from '@/hooks/useDonate'

const MIN_DONATION = 0.01

export function InitialDialog({
  handleClose,
  handleChangeDialogState,
}: DialogProps) {
  const [ethAmount, setEthAmount] = useState<string>('')
  const [isValueValid, setIsValueValid] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
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
  } = useDonate()

  useEffect(() => {
    if (isReceiptSuccess) handleChangeDialogState('success')
  }, [isReceiptSuccess, handleChangeDialogState])

  let blockExplorerUrl: string
  if (SELECTED_CHAIN === 'mainnet') {
    blockExplorerUrl = 'https://etherscan.io'
  } else {
    blockExplorerUrl = 'https://hoodi.etherscan.io'
  }

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

  const validateAmount = useCallback(
    (amount: string) => {
      const numericValue = parseFloat(amount)
      if (Number.isNaN(numericValue) || amount !== sanitizeInput(amount)) {
        setIsValueValid(false)
        setErrorMessage('Please enter a valid amount.')
      } else if (numericValue < MIN_DONATION) {
        setIsValueValid(false)
        setErrorMessage(
          `Only donations greater than or equal to ${MIN_DONATION} ETH are allowed.`
        )
      } else if (numericValue > availableBalance) {
        setIsValueValid(false)
        setErrorMessage('Insufficient balance.')
      } else {
        setIsValueValid(true)
        setErrorMessage('')
      }
    },
    [sanitizeInput, availableBalance]
  )

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
        className={`min-h-full w-full rounded-md border bg-DAppLight p-2 pl-4 [appearance:textfield] focus:outline-none dark:border-DAppDarkSurface-300 dark:bg-DAppDarkSurface-300 ${!isValueValid && 'border-red-500'
          }`}
        placeholder="0.01"
        min={0}
        type="text"
        value={ethAmount}
        onChange={handleChangeInput}
      />
      {!isValueValid && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
      <div className="mt-3 flex w-full items-center justify-between px-2 text-xs text-DAppDeep dark:text-DAppDarkText">
        <p className="flex items-center">
          Available:{' '}
          {isBalanceLoading ? (
            <span className="ml-2 inline-block h-4 w-16 animate-pulse rounded-md bg-gray-200 opacity-90 dark:bg-DAppDarkSurface-300" />
          ) : balance && balance.value !== undefined ? (
            `${parseFloat(utils.formatEther(balance.value)).toFixed(4)} ${balance.symbol}`
          ) : (
            <span className="ml-2 text-red-500">Could not get account balance</span>
          )}
        </p>

      </div>
      <div className="mt-6 flex w-full flex-col gap-y-5 rounded-lg bg-violet-50 p-4 text-sm font-normal text-DAppDeep dark:bg-DAppDarkSurface-300 dark:text-DAppDarkText">
        <div className="flex items-center justify-between">
          <p>Donation to Solo Stakers</p>
          <p>
            {ethAmount || '0'} {balance?.symbol}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center justify-center">
        {awaitingWalletConfirmations ? (
          <div className="flex w-fit animate-pulse flex-col items-center justify-center gap-3 rounded bg-violet-200 p-5 dark:bg-DAppDarkSurface-300 sm:flex-row">
            <AiOutlineInfoCircle />
            <p>Awaiting wallet confirmation.</p>
          </div>
        ) : isConfirming ? (
          <div className="mt-6 w-full rounded-lg bg-violet-50 px-4 py-8 text-sm font-normal text-DAppDeep dark:bg-DAppDarkSurface-300 dark:text-DAppDarkText">
            <div className="mx-auto flex w-fit items-center">
              <AiOutlineInfoCircle />
              <p className="ml-2">Your donation is being processed.</p>
            </div>
            <div className="mx-auto mt-2 max-w-fit">
              <Link
                className="text-violet-500 underline dark:text-violet-200"
                href={`${blockExplorerUrl}/tx/${hash}`}
                target="_blank">
                Check the transaction on block explorer
              </Link>
            </div>
          </div>
        ) : sendError ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
            <p className="rounded bg-violet-200 p-5 dark:bg-DAppDarkSurface-300">
              An error occurred while sending the transaction. Please try again.
            </p>

            <div className="text-DAppRed">
              Error:{' '}
              {(sendError as BaseError).shortMessage || sendError.message}
            </div>
          </div>
        ) : (
          receiptError && (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
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
          )
        )}
      </div>
      <Button
        className="mt-6"
        isDisabled={
          !donate ||
          ethAmount === '' ||
          !isValueValid ||
          awaitingWalletConfirmations ||
          isConfirming
        }
        onPress={() => donate(ethAmount)}>
        Donate
      </Button>
      <Button
        buttonType="secondary"
        className="mt-4"
        isDisabled={awaitingWalletConfirmations || isConfirming}
        onPress={handleClose}>
        Cancel
      </Button>
    </>
  )
}
