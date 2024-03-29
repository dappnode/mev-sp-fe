import { DialogProps } from '../types'
import Link from 'next/link'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useNetwork,
} from 'wagmi'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BigNumber, utils } from 'ethers'
import { fetchConfig } from '@/client/api/queryFunctions'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import { Tooltip } from '@/components/common/Tooltip'
import contractInterface from '@/contract/abi.json'
import { weiToEth } from '@/utils/web3'
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'

interface MultiDepositDialogProps extends DialogProps {
  validatorIds: number[]
  setShowCloseButton: (show: boolean) => void
}

export function MultiDepositDialog({
  steps,
  validatorIds,
  setShowCloseButton,
  handleClose,
  handleChangeDialogState,
}: MultiDepositDialogProps) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const queryClient = useQueryClient()

  const configQuery = useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig,
  })

  const abi = [...contractInterface] as const

  // Convert the collateralInWei to a BigNumber, to multiply it by number of validators
  const collateralInWei = configQuery.data?.collateralInWei
    ? BigNumber.from(configQuery.data.collateralInWei)
    : BigNumber.from(0)

  // Multiply the collateral by the number of validator IDs
  const totalDepositValue = collateralInWei.mul(validatorIds.length)
  const totalDepositInEth = weiToEth(totalDepositValue.toString())
  const totalDepositInString = totalDepositInEth.toString()

  const contractWrite = useContractWrite({
    address: SMOOTHING_POOL_ADDRESS,
    abi,
    functionName: 'subscribeValidators',
    args: [validatorIds],
    value: utils.parseEther(totalDepositInString).toBigInt(),
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
      <div className="-mt-2 text-DAppDeep dark:text-DAppDarkText">
        <h3 className="mb-5 text-left text-2xl font-bold">Deposit</h3>
      </div>
      <StepProgressBar currentStep={1} steps={steps} />

      {!waitForTransaction.isError ? (
        <div className="text-center">
          <h4 className="mb-4 text-lg font-normal">
            To start earning rewards with {validatorIds.length} validators,
            please deposit
          </h4>
          {configQuery.isLoading ? (
            <div className="mx-auto h-8 w-20 animate-pulse rounded bg-SkeletonGray dark:bg-DAppDarkSurface/300" />
          ) : (
            <p className="text-2xl font-bold">{totalDepositInEth} ETH</p>
          )}
          <div className="mt-4 flex items-center justify-center text-lg font-normal tracking-wide">
            <p>to The MEV Smoothing Pool </p>{' '}
            <Link
              className="ml-2 flex items-center"
              href="https://docs.dappnode.io/docs/smooth"
              rel="noopener noreferrer"
              target="_blank">
              <Tooltip
                iconType="question"
                tooltip="To learn more about the required collateral for the smoothing pool click the ?"
              />
            </Link>
          </div>
          {waitForTransaction.isLoading && (
            <div className="mt-6 w-full rounded-lg bg-violet-50 px-4 py-7 text-sm font-normal text-DAppDeep dark:bg-DAppDarkSurface/300 dark:text-DAppDarkText">
              <div className="mx-auto mb-2 flex w-fit flex-col items-center sm:flex-row">
                <AiOutlineInfoCircle />
                <p className="ml-2 mt-1 sm:mt-0">
                  Your deposit is being processed.
                </p>
              </div>
              <Link
                className="text-violet-500 dark:text-violet-200 underline"
                href={`${chain?.blockExplorers?.default.url}/tx/${contractWrite.data?.hash}`}
                target="_blank">
                Check the transaction on block explorer
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-base text-red-500 sm:px-8">
          <AiOutlineInfoCircle className="mx-auto h-8 w-8" />
          <h4 className="mt-1 font-bold sm:mt-4">Deposit error!</h4>
          <p className="mt-1 font-normal sm:mt-4">
            Your Deposit has failed. Please go back and try again.
          </p>
          <h4 className="my-2 font-bold">Error:</h4>
          <div className="mb-4 h-32  overflow-scroll rounded-lg border border-red-400 p-2">
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
              {waitForTransaction.isError ? 'Try again' : 'Deposit'}
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
