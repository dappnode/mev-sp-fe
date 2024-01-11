import { DialogProps } from '../types'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import {
  fetchOnChainProof,
  fetchValidatorByIndex,
} from '@/client/api/queryFunctions'
import { weiToEth } from '@/utils/web3'
import { toFixedNoTrailingZeros } from '@/utils/decimals'

interface ClaimableRewardsDialogProps extends DialogProps {
  validatorId: string
}

export function ClaimableRewardsDialog({
  steps,
  validatorId,
  handleChangeDialogState,
  handleClose,
}: ClaimableRewardsDialogProps) {
  const { address } = useAccount()

  const onChainProofQuery = useQuery({
    queryKey: ['onchain-proof', address],
    queryFn: () => fetchOnChainProof(address as `0x${string}`),
    enabled: !!address,
  })
  const validatorQuery = useQuery({
    queryKey: ['validator', validatorId],
    queryFn: () => fetchValidatorByIndex(validatorId),
  })
  console.log("calling", validatorId)

  const handleNextPage = () => {

    if (onChainProofQuery.data?.claimableRewardsWei === '0') {
      handleChangeDialogState('unsubscribe')
    } else {
      handleChangeDialogState('withdraw')
    }
  }

  return (
    <>
      <div className="-mt-2 text-DAppDeep">
        <h3 className="mb-6 text-left text-2xl font-bold">Claimable rewards</h3>
        <StepProgressBar currentStep={1} steps={steps} />
      </div>
      <div>
        {onChainProofQuery.isError ? (
          <div className="text-center text-red-500">
            <h4 className="font-bold">An Error has occurred</h4>
            <p>Please try again later</p>
          </div>
        ) : onChainProofQuery.isLoading || validatorQuery.isLoading ? (
          <>
            <h4 className="text-center">
              Checking Validator for your rewards...
            </h4>
            <div className="mx-auto mt-8 h-10 w-80 max-w-full animate-pulse rounded bg-SkeletonGray" />
          </>
        ) : (
          <>
            <h4 className="mb-4 text-center text-lg font-semibold">Rewards</h4>
            <div className=" flex w-full flex-col gap-y-8 rounded-lg bg-violet-50  p-6 text-sm font-normal text-DAppDeep sm:text-base">
              <div className="flex items-center justify-between">
                <p>Claimable Rewards</p>
                <p>
                  {toFixedNoTrailingZeros(
                    weiToEth(onChainProofQuery.data?.claimableRewardsWei || 0),
                    4
                  )}{' '}
                  ETH
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Pending Rewards</p>
                <p>
                  {toFixedNoTrailingZeros(
                    weiToEth(validatorQuery.data?.foundValidators?.[0]?.pendingRewardsWei || 0),
                    4
                  )}{' '}
                  ETH
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        <Button
          isDisabled={onChainProofQuery.isLoading || onChainProofQuery.isError}
          onPress={handleNextPage}>
          Next
        </Button>
        <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
          Cancel
        </Button>
      </div>
    </>
  )
}
