import { DialogProps } from '../types'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import { AlertIcon } from '@/components/icons'

export function InitialDialog({
  steps,
  handleChangeDialogState,
  handleClose,
}: DialogProps) {
  return (
    <>
      <div className="-mt-2 text-DAppDeep dark:text-DAppDarkText">
        <h3 className="mb-6 text-left text-2xl font-bold">Warning</h3>
        <StepProgressBar currentStep={0} steps={steps} />
      </div>
      <div>
        <h4 className="mt-1 flex items-center justify-center text-center text-lg font-bold">
          <AlertIcon />
          <span className="ml-2">Attention</span>
        </h4>
        <p className="mt-1 text-center text-base font-normal leading-7 tracking-wide sm:mt-3 sm:px-2 sm:text-lg">
          When unsubscribing you will automatically receive all claimable
          rewards, but will lose all your pending rewards for this validator. We
          recommend unsubscribing right after a successful proposal so you can
          confirm pending rewards to available rewards and leave the pool.
        </p>
      </div>
      <div>
        <Button onPress={() => handleChangeDialogState('confirm')}>
          Claim my rewards
        </Button>
        <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
          Cancel
        </Button>
      </div>
    </>
  )
}
