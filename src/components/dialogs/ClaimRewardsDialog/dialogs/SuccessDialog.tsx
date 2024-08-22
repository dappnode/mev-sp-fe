import { DialogProps } from '../types'
import { Button } from '@/components/common/Button'
import { CongratulationsIcon } from '@/components/icons'

export function SuccessDialog({ handleChangeDialogState }: DialogProps) {
  return (
    <>
      <div className="px-6 text-center text-DAppDeep dark:text-DAppDarkText">
        <div className="mb-4 flex justify-center">
          <CongratulationsIcon />
        </div>
        <h3 className="text-lg font-normal">Congratulations!</h3>
        <div className="mt-4 text-lg font-normal tracking-wide">
          <p>You have claimed your rewards from Smooth.</p>
        </div>
      </div>
      <Button
        className="mt-5"
        onPress={() => handleChangeDialogState('feedback')}>
        Next
      </Button>
    </>
  )
}
