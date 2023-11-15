import {
  InitialDialog,
  CheckMevBoostDialog,
  DepositDialog,
  SuccessDialog,
} from './dialogs'
import { BaseDialog } from '../BaseDialog'
import { useState } from 'react'
import { useNetwork } from 'wagmi'
import { AnimatePresence } from 'framer-motion'
import { useDialog } from '@/hooks/useDialog'
import type { IDialogStates } from './types'

const steps = ['Fee recipient', 'MEV Blocks check', 'Deposit', 'Done']

interface SubscribeToMevDialogProps {
  validatorId?: number
  validatorIds?: number[]
  validatorKey: `0x${string}`
}

export function SubscribeToMevDialog({
  validatorId,
  validatorKey,
  validatorIds,
}: SubscribeToMevDialogProps) {
  const { chain } = useNetwork()
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
      disabledTrigger={chain?.unsupported}
      handleOpenChange={handleOpenChangeDialog}
      open={open}
      showCloseButton={showCloseButton}
      subtitle="Subscribe"
      triggerButtonProp="outline"
      triggerText="Subscribe">
      <AnimatePresence>
        <div className="flex h-[550px] flex-col justify-between text-DAppDeep sm:h-[500px]">
          {dialogState === 'initial' ? (
            <InitialDialog
              handleChangeDialogState={setDialogState}
              handleClose={handleCloseDialog}
              steps={steps}
              validatorKey={validatorKey}
            />
          ) : dialogState === 'confirm' && !validatorIds ? (
            <CheckMevBoostDialog
              handleChangeDialogState={setDialogState}
              handleClose={handleCloseDialog}
              steps={steps}
              validatorKey={validatorKey}
            />
          ) : dialogState === 'loading' ? (
            validatorIds ? (
              <DepositDialog
                handleChangeDialogState={setDialogState}
                handleClose={handleCloseDialog}
                setShowCloseButton={setShowCloseButton}
                steps={steps}
                validatorIds={validatorIds}
              />
            ) : validatorId != null ? (
              <DepositDialog
                handleChangeDialogState={setDialogState}
                handleClose={handleCloseDialog}
                setShowCloseButton={setShowCloseButton}
                steps={steps}
                validatorId={validatorId}
              />
            ) : null
          ) : (
            <SuccessDialog
              handleChangeDialogState={setDialogState}
              handleClose={handleCloseDialog}
              steps={steps}
            />
          )}
        </div>
      </AnimatePresence>
    </BaseDialog>
  )
}
