import { DialogProps, MultiDialogProps } from '../types'
import { BigNumber } from 'ethers'
import { useQuery } from '@tanstack/react-query'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import { fetchConfig } from '@/client/api/queryFunctions'
import { CongratulationsIcon } from '@/components/icons'
import { weiToEth } from '@/utils/web3'
import { toFixedNoTrailingZeros } from '@/utils/decimals'

export function SuccessDialog({ steps, handleClose }: DialogProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig,
  })

  return (
    <>
      <div className="-mt-2 text-DAppDeep dark:text-DAppDarkText">
        <h3 className="mb-6 text-left text-2xl font-bold">Success!</h3>
        <StepProgressBar currentStep={3} steps={steps} />
      </div>
      <div className="mx-auto flex flex-col items-center gap-y-3 px-4 text-center text-lg">
        <CongratulationsIcon />
        <h4 className="font-bold">Congratulations!</h4>
        <p>You have successfully subscribed and deposited an upfront bond of</p>
        <p className="font-bold">
          {isLoading || isError ? (
            <div className="h-8 w-12 animate-pulse rounded bg-SkeletonGray dark:bg-DAppDarkSurface/300" />
          ) : (
            `${toFixedNoTrailingZeros(weiToEth(data?.collateralInWei), 2)} ETH`
          )}
        </p>
        <p>to Smooth</p>
        <p>
          You are now accumulating rewards from the Smoothing Pool. Claim them
          after you successfully propose a block!
        </p>
      </div>
      <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
        Done
      </Button>
    </>
  )
}

export function MultiSuccessDialog({
  validatorIds,
  steps,
  handleClose,
}: MultiDialogProps) {
  const { isLoading, isError } = useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig,
  })

  const configQuery = useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig,
  })

  // Convert the collateralInWei to a BigNumber, to multiply it by number of validators
  const collateralInWei = configQuery.data?.collateralInWei
    ? BigNumber.from(configQuery.data.collateralInWei)
    : BigNumber.from(0)

  // Multiply the collateral by the number of validator IDs
  const totalDepositValue = collateralInWei.mul(validatorIds.length)
  const totalDepositInEth = weiToEth(totalDepositValue.toString())

  return (
    <>
      <div className="-mt-2 text-DAppDeep">
        <h3 className="mb-6 text-left text-2xl font-bold">Success!</h3>
        <StepProgressBar currentStep={2} steps={steps} />
      </div>
      <div className="mx-auto flex flex-col items-center gap-y-3 px-4 text-center text-lg">
        <CongratulationsIcon />
        <h4 className="font-bold">Congratulations!</h4>
        <p>
          You have successfully subscribed {validatorIds.length} validators and
          deposited an upfront bond of
        </p>
        <p className="font-bold">
          {isLoading || isError ? (
            <div className="h-8 w-12 animate-pulse rounded bg-SkeletonGray" />
          ) : (
            `${totalDepositInEth} ETH`
          )}
        </p>
        <p>to The MEV Smoothing Pool</p>
        <p>
          You are now accumulating rewards from the Smoothing Pool. Claim them
          after you successfully propose a block!
        </p>
      </div>
      <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
        Done
      </Button>
    </>
  )
}
