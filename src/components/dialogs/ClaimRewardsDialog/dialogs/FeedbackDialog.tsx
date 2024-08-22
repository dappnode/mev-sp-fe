import { DialogProps } from '../types'
import { Button } from '@/components/common/Button'
import {
  StarIcon,
  StarFilledIcon
} from '@radix-ui/react-icons'
import { useState } from 'react'
export function FeedbackDialog({ handleClose}: DialogProps) {

  const [selectedStars, setSelectedStars]=useState(0);
  return (
    <>
      <div className="px-6 text-center text-DAppDeep dark:text-DAppDarkText">
      <div className="mx-auto flex flex-col items-center gap-y-4 text-center text-lg sm:px-4 text-DAppDeep dark:text-DAppDarkText">
        <h4 className="font-bold">
        Please help us improve by answering a
          few quick questions.
        </h4>
        <div className="flex flex-col text-left gap-7 w-full py-5">
          <div>
            <div>
              1. How smooth would you rate your Smooth experience?

              <span className="text-xs"> (Select all that apply)</span>
            </div>
            
          </div>
          </div>
          <div>
            <div>2. What can we do to even smoothier?</div>
         <textarea>

         </textarea>
          </div>
        </div>
      </div>
      <Button className="mt-5" onPress={handleClose}>
        Done
      </Button>
    </>
  )
}
