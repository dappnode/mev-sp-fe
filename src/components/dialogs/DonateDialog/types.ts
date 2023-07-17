export type IDialogStates = 'initial' | 'confirm' | 'loading' | 'success'

export interface DialogProps {
  handleClose: () => void
  handleChangeDialogState: (state: IDialogStates) => void
}
