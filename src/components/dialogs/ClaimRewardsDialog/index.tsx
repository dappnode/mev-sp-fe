import {
  WithdrawDialog,
  SuccessDialog,
  InitialDialog,
  FeedbackDialog,
} from './dialogs'
import { BaseDialog } from '../BaseDialog'
import { useState } from 'react'
import { useDialog } from '@/hooks/useDialog'
import type { IDialogStates } from './types'

interface ClaimRewardsDialogProps {
  claimableRewards: number
  disabledTrigger?: boolean
}

export function ClaimRewardsDialog({
  claimableRewards,
  disabledTrigger,
}: ClaimRewardsDialogProps) {
  const { open, handleClose, handleOpenChange } = useDialog()
  const [dialogState, setDialogState] = useState<IDialogStates>('initial')

  const handleCloseDialog = () => {
    handleClose()
    setDialogState('initial')
  }

  const handleOpenChangeDialog = (newOpen: boolean) => {
    handleOpenChange(newOpen)
    if (!newOpen) setDialogState('initial')
  }
  return (
    <BaseDialog
      disabledTrigger={disabledTrigger}
      handleOpenChange={handleOpenChangeDialog}
      showCloseButton={false}
      open={open}
      subtitle="Claim rewards"
      triggerText="Claim All">
      <div className="flex h-full min-h-[500px] flex-col justify-between text-DAppDeep dark:text-DAppDarkText sm:h-[280px]">
        {dialogState === 'initial' ? (
          <InitialDialog
            handleChangeDialogState={setDialogState}
            handleClose={handleCloseDialog}
          />
        ) : dialogState === 'confirm' ? (
          <WithdrawDialog
            claimableRewards={claimableRewards}
            handleChangeDialogState={setDialogState}
            handleClose={handleCloseDialog}
          />
        ) : dialogState === 'success' ? (
          <SuccessDialog
            handleChangeDialogState={setDialogState}
            handleClose={handleCloseDialog}
          />
        ) : (
          <FeedbackDialog
            claimableRewards={claimableRewards}
            handleChangeDialogState={setDialogState}
            handleClose={handleCloseDialog}
          />
        )}
      </div>
    </BaseDialog>
  )
}
