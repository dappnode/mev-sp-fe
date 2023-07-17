import { DialogProps } from '../types'
import { Button } from '@/components/common/Button'

export function ConfirmDialog({
  handleClose,
  handleChangeDialogState,
}: DialogProps) {
  return (
    <>
      <div className="px-10 text-center text-DAppDeep">
        <h3 className="text-lg font-normal">You are donating</h3>
        <p className="mt-4 text-2xl font-bold">0.0578 ETH ~ 245.50 USD </p>
        <p className="mt-4 text-lg font-normal tracking-wide">to DAppNode </p>
      </div>
      <Button
        className="mt-7"
        onPress={() => handleChangeDialogState('loading')}>
        Yes, Proceed
      </Button>
      <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
        Cancel
      </Button>
    </>
  )
}
