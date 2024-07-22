import {
  InitialDialog,
  SuccessDialog,
} from './dialogs'
import { UnsubscribeDialog } from './dialogs/UnsubscribeDialog'
import { BaseDialog } from '../BaseDialog'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { AnimatePresence } from 'framer-motion'
import { useDialog } from '@/hooks/useDialog'
import type { IDialogStates } from './types'

const steps = [
  'Confirmation',
  'Unsubscribe',
  'Done',
]

interface UnsubscribeToMevDialogProps {
  validatorId: number
}

export function UnsubscribeToMevDialog({
  validatorId,
}: UnsubscribeToMevDialogProps) {
  const { chain } = useAccount()
  const [dialogState, setDialogState] = useState<IDialogStates>('initial')
  const [showCloseButton, setShowCloseButton] = useState<boolean>(true)

  const { open, handleOpenChange, handleClose } = useDialog()

  const handleCloseDialog = () => {
    setDialogState('initial')
    handleClose()
  }

  const handleOpenChangeDialog = (newOpen: boolean) => {
    handleOpenChange(newOpen)
    if (!newOpen) setDialogState('initial')
  }

  return (
    <BaseDialog
      disabledTrigger={chain?.id !== 1}
      handleOpenChange={handleOpenChangeDialog}
      open={open}
      showCloseButton={showCloseButton}
      subtitle="Unsubscribe Validator"
      triggerButtonProp="outline"
      triggerText="Unsubscribe">
      <AnimatePresence>
        <div className="flex h-[550px] flex-col justify-between text-DAppDeep sm:h-[550px]">
          {dialogState === 'initial' ? (
            <InitialDialog
              handleChangeDialogState={setDialogState}
              handleClose={handleCloseDialog}
              steps={steps}
            />
          ) : dialogState === 'unsubscribe' ? (
            <UnsubscribeDialog
              handleChangeDialogState={setDialogState}
              handleClose={handleCloseDialog}
              setShowCloseButton={setShowCloseButton}
              steps={steps}
              validatorId={validatorId}
            />
          ) : (
            <SuccessDialog
              handleChangeDialogState={setDialogState}
              handleClose={handleCloseDialog}
              steps={steps}
              validatorId={validatorId}
            />
          )}
        </div>
      </AnimatePresence>
    </BaseDialog>
  )
}
