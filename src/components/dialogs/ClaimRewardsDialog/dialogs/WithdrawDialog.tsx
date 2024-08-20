import { DialogProps } from '../types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import {
  useAccount,
  useNetwork,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { fetchOnChainProof } from '@/client/api/queryFunctions'
import { Button } from '@/components/common/Button'
import { toFixedNoTrailingZeros } from '@/utils/decimals'
import { SMOOTHING_POOL_ADDRESS } from '@/utils/config'
import contractInterface from '@/contract/abi.json'

interface WithdrawDialogProps extends DialogProps {
  claimableRewards: number
}

export function WithdrawDialog({
  claimableRewards,
  handleClose,
  handleChangeDialogState,
}: WithdrawDialogProps) {
  const { chain } = useNetwork()
  const { address } = useAccount()
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
      onChainProofQuery.data?.merkleProofs,
    ],
  })

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    confirmations: 2,
    onSuccess: () => {
      handleChangeDialogState('success')
      queryClient.invalidateQueries({
        queryKey: ['onchain-proof', address],
      })
    },
  })

  return (
    <>
      {!waitForTransaction.isError ? (
        <div className="px-10 text-center text-DAppDeep dark:text-DAppDarkText">
          <h3 className="text-lg font-normal">You are withdrawing</h3>
          <p className="mt-4 text-2xl font-bold">
            {toFixedNoTrailingZeros(claimableRewards, 4)} ETH
          </p>
          <p className="mt-4 text-lg font-normal tracking-wide">
            to your recipient wallet address
          </p>
          {waitForTransaction.isLoading && (
            <div className="mt-6 w-full rounded-lg bg-violet-50 px-4 py-8 text-sm font-normal text-DAppDeep dark:bg-DAppDarkSurface-300 dark:text-DAppDarkText">
              <div className="mx-auto flex w-fit items-center">
                <AiOutlineInfoCircle />
                <p className="ml-2">Your withdrawal is being processed.</p>
              </div>
              <div className="mx-auto mt-2 max-w-fit">
                <Link
                  className="text-violet-500 underline dark:text-violet-200"
                  href={`${chain?.blockExplorers?.default.url}/tx/${contractWrite.data?.hash}`}
                  target="_blank">
                  Check the transaction on block explorer
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="px-8 text-center text-base text-red-500">
          <AiOutlineInfoCircle className="mx-auto h-8 w-8" />
          <h4 className="mt-4 font-bold">Withdrawal error!</h4>
          <p className="mt-4 font-normal">
            Your Withdrawal has failed. Please go back and try again.
          </p>
          <h4 className="my-2  font-bold">Error:</h4>
          <div className="mb-4 h-32  overflow-scroll rounded-lg border border-red-400 p-2">
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
