import { DialogProps } from '../types'
import { Button } from '@/components/common/Button'

export function InitialDialog({
  handleClose,
  handleChangeDialogState,
}: DialogProps) {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-center gap-5 px-10 text-center text-DAppDeep dark:text-DAppDarkText">
        <h3 className="text-2xl font-bold">Withdraw rewards</h3>
        <p className="text-lg font-normal leading-7 tracking-wide">
          Are you sure you wish to withdraw all pool rewards to your recipient
          address?
        </p>
      </div>
      <div>
        <Button onPress={() => handleChangeDialogState('confirm')}>
          Yes, Proceed
        </Button>
        <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
          Cancel
        </Button>
      </div>
    </>
  )
}
