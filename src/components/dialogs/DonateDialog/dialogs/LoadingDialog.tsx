import { DialogProps } from '../types'
import { useEffect } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Button } from '@/components/common/Button'

export function LoadingDialog({
  handleClose,
  handleChangeDialogState,
}: DialogProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleChangeDialogState('success')
    }, 3000)
    return () => clearTimeout(timer)
  }, [handleChangeDialogState])

  return (
    <>
      <div className="px-10 text-center text-DAppDeep">
        <h3 className="text-lg font-normal">You are donating</h3>
        <p className="mt-4 text-2xl font-bold">0.0578 ETH ~ 245.50 USD </p>
        <p className="mt-4 text-lg font-normal tracking-wide">to DAppNode </p>
      </div>
      <div className="mt-6 w-full rounded-lg bg-violet-50 px-4 py-8 text-sm font-normal text-DAppDeep dark:bg-DAppDarkSurface-300 dark:text-DAppDarkText">
        <div className="mx-auto flex w-fit items-center">
          <AiOutlineInfoCircle />
          <p className="ml-2">Your donation is being processed.</p>
        </div>
      </div>
      <Button
        isDisabled
        className="mt-7"
        onPress={() => handleChangeDialogState('loading')}>
        Yes, Proceed
      </Button>
      <Button
        isDisabled
        buttonType="secondary"
        className="mt-4"
        onPress={handleClose}>
        Cancel
      </Button>
    </>
  )
}
