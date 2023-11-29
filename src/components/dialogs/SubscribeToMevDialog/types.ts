import { StepProgressBarProps } from '@/components/common/StepProgressBar'

export type IDialogStates = 'initial' | 'confirm' | 'loading' | 'success'

export interface DialogProps extends Pick<StepProgressBarProps, 'steps'> {
  handleClose: () => void
  handleChangeDialogState: (state: IDialogStates) => void
}

export interface MultiDialogProps extends Pick<StepProgressBarProps, 'steps'> {
  validatorIds: number[]
  handleClose: () => void
  handleChangeDialogState: (state: IDialogStates) => void
}