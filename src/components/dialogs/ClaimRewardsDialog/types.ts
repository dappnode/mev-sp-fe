export type IDialogStates = 'initial' | 'confirm' | 'loading' | 'success' | 'feedback' 

export interface DialogProps {
  handleClose: () => void
  handleChangeDialogState: (state: IDialogStates) => void
}
