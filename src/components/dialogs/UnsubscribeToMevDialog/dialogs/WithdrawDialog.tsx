import { DialogProps } from '../types'
import Link from 'next/link'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  useAccount,
  useNetwork,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { fetchOnChainProof } from '@/client/api/queryFunctions'
import { weiToEth } from '@/utils/web3'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import contractInterface from '@/contract/abi.json'
import { toFixedNoTrailingZeros } from '@/utils/decimals'
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'

export function WithdrawDialog({
  steps,
  handleChangeDialogState,
  handleClose,
}: DialogProps) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const queryClient = useQueryClient()

  const onChainProofQuery = useQuery({
    queryKey: ['onchain-proof', address],
    queryFn: () => fetchOnChainProof(address as `0x${string}`),
    enabled: !!address,
  })

  const abi = [...contractInterface] as const

  const contractWrite = useContractWrite({
    address: SMOOTHING_POOL_ADDRESS,
    abi,
    functionName: 'claimRewards',
    args: [
      address,
      onChainProofQuery.data?.leafAccumulatedBalance,
      onChainProofQuery.data?.merkleProofs || [],
    ],
  })

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    confirmations: 2,
    onSuccess: () => {
      handleChangeDialogState('unsubscribe')
      queryClient.invalidateQueries({
        queryKey: ['onchain-proof', address],
      })
    },
  })

  return (
    <>
      <div className="-mt-2 text-DAppDeep dark:text-DAppDarkText">
        <h3 className="mb-6 text-left text-2xl font-bold">Withdraw</h3>
        <StepProgressBar currentStep={2} steps={steps} />
      </div>
      {!waitForTransaction.isError ? (
        <div className="text-center">
          <h4 className="text-lg font-normal">You are withdrawing</h4>
          <p className="mt-4 text-2xl font-bold">
            {toFixedNoTrailingZeros(
              weiToEth(onChainProofQuery.data?.claimableRewardsWei || 0),
              2
            )}{' '}
            ETH
          </p>
          <p className="mt-4 text-lg font-normal tracking-wide">
            to your recipient wallet address
          </p>
          {waitForTransaction.isLoading && (
            <div className="mt-6 w-full rounded-lg bg-violet-50 px-4 py-8 text-sm font-normal text-DAppDeep dark:bg-DAppDarkSurface/300 dark:text-DAppDarkText">
              <div className="mx-auto mb-2 flex w-fit flex-col items-center sm:flex-row">
                <AiOutlineInfoCircle />
                <p className="ml-2 mt-1 sm:mt-0">
                  Your withdrawal is being processed.
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
          <h4 className="mt-1 font-bold">Withdrawal error!</h4>
          <p className="mt-1 font-normal">
            Your Withdrawal has failed. Please go back and try again.
          </p>
          <h4 className="my-1 font-bold">Error:</h4>
          <div className="mb-4 h-32 overflow-scroll rounded-lg border border-red-400 p-2">
            {waitForTransaction.error?.message}
          </div>
        </div>
      )}
      <div>
        <Button
          isDisabled={contractWrite.isLoading || waitForTransaction.isLoading}
          onPress={() => contractWrite.write?.()}>
          {waitForTransaction.isError ? 'Try again' : 'Withdraw'}
        </Button>
        <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
          Cancel
        </Button>
      </div>
    </>
  )
}
