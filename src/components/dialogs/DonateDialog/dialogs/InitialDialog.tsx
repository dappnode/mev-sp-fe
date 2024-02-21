import { DialogProps } from '../types'
import Link from 'next/link'
import {
  useAccount,
  useBalance,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useNetwork,
} from 'wagmi'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { utils } from 'ethers'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Button } from '@/components/common/Button'
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'

export function InitialDialog({
  handleClose,
  handleChangeDialogState,
}: DialogProps) {
  const [ethAmount, setEthAmount] = useState<number>(0)
  const [debouncedEthAmount] = useDebounce(String(ethAmount), 500)

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { data, isLoading } = useBalance({
    address,
  })

  const { config } = usePrepareSendTransaction({
    to: SMOOTHING_POOL_ADDRESS,
    value: debouncedEthAmount
      ? utils.parseEther(debouncedEthAmount).toBigInt()
      : undefined,
  })

  const contractWrite = useSendTransaction(config)

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    onSuccess: () => {
      handleChangeDialogState('success')
    },
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEthAmount(Number(e.target.value))
  }

  return (
    <>
      <input
        className="min-h-full w-full rounded-md border bg-DAppLight p-2 pl-4 [appearance:textfield] focus:outline-none dark:border-DAppDarkSurface/300 dark:bg-DAppDarkSurface/300"
        min={0}
        placeholder="0.00"
        type="number"
        value={ethAmount}
        onChange={handleChangeInput}
      />
      <div className="mt-3 flex w-full items-center justify-between px-2 text-xs text-DAppDeep dark:text-DAppDarkText">
        <p className="flex items-center">
          Available:{' '}
          {isLoading ? (
            <span className="ml-2 inline-block h-4 w-16 animate-pulse rounded-md bg-gray-200 opacity-90 dark:bg-DAppDarkSurface/300" />
          ) : (
            <>
              {data?.formatted} {data?.symbol}
            </>
          )}
        </p>
        <button
          type="button"
          onClick={() =>
            setEthAmount(data?.formatted ? Number(data?.formatted) : 0)
          }>
          Max
        </button>
      </div>
      <div className="mt-6 flex w-full flex-col gap-y-5 rounded-lg bg-violet-50 p-4 text-sm font-normal text-DAppDeep dark:bg-DAppDarkSurface/300 dark:text-DAppDarkText">
        <div className="flex items-center justify-between">
          <p>Donation to Solo Stakers</p>
          <p>
            {ethAmount} {data?.symbol}
          </p>
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
              className=" text-violet-500 dark:text-violet-200 underline"
              href={`${chain?.blockExplorers?.default.url}/tx/${contractWrite.data?.hash}`}
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
          <h4 className="my-2  font-bold">Error:</h4>
          <div className="mb-4 h-32  overflow-scroll rounded-lg border border-red-400 p-2">
            {waitForTransaction.error?.message}
          </div>
        </div>
      ) : null}
      <Button
        className="mt-6"
        isDisabled={
          !contractWrite.sendTransaction ||
          ethAmount === 0 ||
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
