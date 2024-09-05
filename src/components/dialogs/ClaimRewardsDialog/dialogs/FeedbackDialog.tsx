import { DialogProps } from '../types'
import { useAccount } from 'wagmi'
import { StarIcon, StarFilledIcon } from '@radix-ui/react-icons'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/common/Button'
import {
  SELECTED_CHAIN,
  CLAIM_FEEDBACK_TIMESTAMP,
  FEEDBACK_SCRIPT_URL
} from '@/utils/config'

interface FeedbackDialogProps extends DialogProps {
  claimableRewards: number
}

export function FeedbackDialog({
  claimableRewards,
  handleClose,
}: FeedbackDialogProps) {
  const [selectedStars, setSelectedStars] = useState(0)
  const numStars = 5

  const [improvementsFeedback, setImprovementsFeedback] = useState('')
  const [sendingFeedback, setSendingFeedback] = useState(false)
  const { address } = useAccount()

  useEffect(() => {
    storeTimestamp()
  }, [])

  const storeTimestamp = () => {
    const timestamp = Date.now()
    localStorage.setItem(CLAIM_FEEDBACK_TIMESTAMP, timestamp.toString())
  }

  const postFeedbackData = useCallback(async () => {
    setSendingFeedback(true)
    const formData = new FormData()
    formData.append('sheetName', 'claim')
    formData.append('network', SELECTED_CHAIN)
    if (address) {
      formData.append('address', address.toString())
    }
    formData.append('timestamp', new Date().toISOString())
    formData.append(
      'stars',
      selectedStars === 0 ? '-' : selectedStars.toString()
    )
    formData.append('improvements', improvementsFeedback || '-')
    formData.append('claimAmount', claimableRewards.toString())

    if (FEEDBACK_SCRIPT_URL) {
      await fetch(FEEDBACK_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      })
    }

    handleClose()
    setSendingFeedback(false)
  }, [address, selectedStars, improvementsFeedback, claimableRewards, handleClose])

  return (
    <div className="flex h-full w-full flex-col items-center justify-between text-center text-lg text-DAppDeep dark:text-DAppDarkText">
      {sendingFeedback ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
          <div className="tracking-wide">
            Thank you for being a part of Smooth!
          </div>
          <div className="animate-pulse rounded bg-SkeletonGray px-10 py-5 dark:bg-DAppDarkSurface-300">
            Please, wait a few seconds
          </div>
        </div>
      ) : (
        <>
          <h4 className="text-left font-bold">
            Please help us improve by answering a few quick questions.
          </h4>
          <div className="flex flex-1 flex-col justify-evenly">
            <div>
              1. How smooth would you rate your Smooth experience?
              <div className="mt-3 flex flex-row justify-evenly gap-2 px-14">
                {Array.from({ length: numStars }).map((_, i) => (
                  <div key={i /* eslint-disable-line react/no-array-index-key */}>
                    <Star
                      isSelected={i < selectedStars}
                      starNum={i + 1}
                      setSelectedStars={setSelectedStars}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full px-10">
              <div>2. What can we do to even smoother?</div>
              <textarea
                className="mt-3 h-32 w-full resize-none rounded bg-gray-200 p-2 text-base dark:bg-DAppDarkSurface-300"
                placeholder="Type here..."
                value={improvementsFeedback}
                onChange={(e) => {
                  setImprovementsFeedback(e.target.value)
                }}
              />
            </div>
          </div>
        </>
      )}
      {!sendingFeedback && (
        <Button onPress={postFeedbackData} isDisabled={sendingFeedback}>
          {selectedStars !== 0 || improvementsFeedback
            ? 'Send Feedback'
            : 'Skip'}
        </Button>
      )}
    </div>
  )
}

function Star({
  starNum,
  isSelected,
  setSelectedStars,
}: {
  starNum: number
  isSelected: boolean
  setSelectedStars: React.Dispatch<React.SetStateAction<number>>
}) {
  const StarType = isSelected ? StarFilledIcon : StarIcon

  return (
    <StarType
      className="cursor-pointer text-DAppPurple-900 transition-colors duration-100 ease-in-out hover:text-DAppPurple-900/75"
      width={40}
      height={40}
      onClick={() => setSelectedStars(starNum)}
    />
  )
}
