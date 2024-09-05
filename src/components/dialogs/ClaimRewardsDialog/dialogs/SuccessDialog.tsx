import { DialogProps } from '../types'
import { Button } from '@/components/common/Button'
import { CongratulationsIcon } from '@/components/icons'
import { CLAIM_FEEDBACK_TIMESTAMP } from '@/utils/config'

export function SuccessDialog({
  handleChangeDialogState,
  handleClose,
}: DialogProps) {
  const showFeedbackDialogInterval = 40 * 24 * 60 * 60 * 1000 // Forty days in ms
  const storedTimestamp = localStorage.getItem(CLAIM_FEEDBACK_TIMESTAMP)
  const parsedTimestamp = storedTimestamp ? parseInt(storedTimestamp, 10) : null
  const currentTime = Date.now()

  // check if 40 days have passed since the stored timestamp
  const showFeedbackDialog = parsedTimestamp
    ? currentTime - parsedTimestamp > showFeedbackDialogInterval
    : true

    const handleNext = () => {
      if (showFeedbackDialog) {
        handleChangeDialogState('feedback');
      } else {
        handleClose();
      }
    };

  return (
    <>
      <div className="flex h-full flex-col justify-center gap-5 px-6 text-center text-lg font-normal text-DAppDeep dark:text-DAppDarkText">
        <div className="flex justify-center">
          <CongratulationsIcon />
        </div>
        <h3>Congratulations!</h3>
        <div className="tracking-wide">
          <p>You have claimed your rewards from Smooth.</p>
        </div>
      </div>
      <Button onPress={handleNext}>
        {showFeedbackDialog ? 'Next' : 'Close'}
      </Button>
    </>
  )
}
