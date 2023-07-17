import { DialogProps } from '../types'
import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import { fetchOnChainProof } from '@/client/api/queryFunctions'
import { CongratulationsIcon } from '@/components/icons'
import { weiToEth } from '@/utils/web3'
import { toFixedNoTrailingZeros } from '@/utils/decimals'

export function SuccessDialog({ steps, handleClose }: DialogProps) {
  const { address } = useAccount()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['onchain-proof', address],
    queryFn: () => fetchOnChainProof(address as `0x${string}`),
    enabled: !!address,
  })

  return (
    <>
      <div className="-mt-2 text-DAppDeep">
        <h3 className="mb-6 text-left text-2xl font-bold">Success!</h3>
        <StepProgressBar currentStep={4} steps={steps} />
      </div>
      <div className="mx-auto flex flex-col items-center gap-y-4 text-center text-lg sm:px-4">
        <CongratulationsIcon />
        <h4 className="font-bold">Congratulations!</h4>
        <p>
          You have successfully unsubscribed and withdrawn all your claimable
          rewards of
        </p>
        <p className="font-bold">
          {isLoading || isError ? (
            <div className="h-8 w-24 animate-pulse rounded bg-SkeletonGray" />
          ) : (
            <p className="h-8">
              {toFixedNoTrailingZeros(
                weiToEth(data?.claimableRewardsWei || 0),
                4
              )}{' '}
              ETH
            </p>
          )}
        </p>
        <p>
          You can now change your fee recipient in your validator software
          without any penalties. We&apos;re sad to see you go!
        </p>
      </div>
      <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
        Done
      </Button>
    </>
  )
}
