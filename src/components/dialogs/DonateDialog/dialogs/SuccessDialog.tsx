import { DialogProps } from '../types'
import { Button } from '@/components/common/Button'

export function SuccessDialog({ handleClose }: DialogProps) {
  return (
    <>
      <div className="px-6 text-center text-DAppDeep dark:text-DAppDarkText">
        <h3 className="text-lg font-normal">Congratulations!</h3>
        <div className="mt-4 text-lg font-normal tracking-wide">
          <p>Your contribution goes a long way, we really appreciate it.</p>
        </div>
      </div>
      <Button className="mt-5" onPress={handleClose}>
        Done
      </Button>
    </>
  )
}
