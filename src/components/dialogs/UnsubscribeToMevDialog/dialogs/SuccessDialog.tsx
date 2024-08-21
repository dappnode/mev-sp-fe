import { DialogProps } from '../types'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import { CongratulationsIcon } from '@/components/icons'

interface SuccessUnsubscribeDialog extends DialogProps {
  validatorId: number
}

export function SuccessDialog({
  steps,
  validatorId,
  handleClose,
}: SuccessUnsubscribeDialog) {
  return (
    <>
      <div className="-mt-2 text-DAppDeep dark:text-DAppDarkText">
        <h3 className="mb-6 text-left text-2xl font-bold">Success!</h3>
        <StepProgressBar currentStep={3} steps={steps} />
      </div>
      <div className="mx-auto flex flex-col items-center gap-y-4 text-center text-lg text-DAppDeep dark:text-DAppDarkText sm:px-4">
        <CongratulationsIcon />
        <h4 className="font-bold">Success!</h4>
        <p>
          You have successfully unsubscribed validator <b>{validatorId}</b> from
          Smooth.
        </p>
        <p>
          You can now change your fee recipient of you validator without any
          penalties. We&#39;re sad to see you go!
        </p>
      </div>
      <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
        Close
      </Button>
    </>
  )
}
