import {
  ConfirmDialog,
  LoadingDialog,
  SuccessDialog,
  InitialDialog,
} from './dialogs'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useDialog } from '@/hooks/useDialog'
import { BaseDialog } from '@/components/dialogs/BaseDialog'
import type { IDialogStates } from './types'
import { isWalletConnectedChainOk } from '@/utils/web3'

export function DonateDialog() {
  const { open, handleClose, handleOpenChange } = useDialog()
  const [dialogState, setDialogState] = useState<IDialogStates>('initial')
  const { chain } = useAccount()

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
      handleOpenChange={handleOpenChangeDialog}
      open={open}
      subtitle="Donate to Smooth"
      disabledTrigger={!isWalletConnectedChainOk(chain)}
      triggerText="Donate Now">
      {dialogState === 'initial' ? (
        <InitialDialog
          handleChangeDialogState={setDialogState}
          handleClose={handleCloseDialog}
        />
      ) : dialogState === 'confirm' ? (
        <ConfirmDialog
          handleChangeDialogState={setDialogState}
          handleClose={handleCloseDialog}
        />
      ) : dialogState === 'loading' ? (
        <LoadingDialog
          handleChangeDialogState={setDialogState}
          handleClose={handleCloseDialog}
        />
      ) : (
        <SuccessDialog
          handleChangeDialogState={setDialogState}
          handleClose={handleCloseDialog}
        />
      )}
    </BaseDialog>
  )
}
