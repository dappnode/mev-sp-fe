import { StepProgressBarProps } from '@/components/common/StepProgressBar'

export type IDialogStates =
  | 'initial'
  | 'unsubscribe'
  | 'success'

export interface DialogProps extends Pick<StepProgressBarProps, 'steps'> {
  handleClose: () => void
  handleChangeDialogState: (state: IDialogStates) => void
}
