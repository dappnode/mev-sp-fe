import { DialogProps } from '../types'
import { Button } from '@/components/common/Button'
import { StepProgressBar } from '@/components/common/StepProgressBar'

interface FeedbackUnsubscribeDialog extends DialogProps {
  selectedOptions: string[]
  setSelectedOptions: (options: string[]) => void
  otherOption: string
  setOtherOption: (option: string) => void
  otherOptionSelected: boolean
  setOtherOptionSelected: (selected: boolean) => void
  improvementsFeedback: string
  setImprovementsFeedback: (feedback: string) => void
}

export function FeedbackDialog({
  steps,
  handleChangeDialogState,
  handleClose,
  selectedOptions,
  setSelectedOptions,
  otherOption,
  setOtherOption,
  otherOptionSelected,
  setOtherOptionSelected,
  improvementsFeedback,
  setImprovementsFeedback,
}: FeedbackUnsubscribeDialog) {
  const options = [
    'I will no longer stake ETH',
    'The rewards were not as high as I expected',
    'I am moving to a different pool',
    'The fees are too high',
    'I want to gamble that I will get a lottery block',
  ]

  const handleOptionChange = (option: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedOptions([...selectedOptions, option])
    } else {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option))
    }
  }
  const handleOtherOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherOption(event.target.value)
  }

  const handleNextStep = () => {
    handleChangeDialogState('unsubscribe')
  }

  return (
    <>
      <div className="-mt-2 text-DAppDeep dark:text-DAppDarkText">
        <h3 className="mb-6 text-left text-2xl font-bold">
          Why are you leaving Smooth?
        </h3>
        <StepProgressBar currentStep={1} steps={steps} />
      </div>
      <div className="mx-auto flex flex-col items-center gap-y-4 text-center text-lg text-DAppDeep dark:text-DAppDarkText sm:px-4">
        <h4 className="font-bold">
          We&#39;re sorry to see you go! Please help us improve by answering a
          few quick questions.
        </h4>
        <div className="flex w-full flex-col gap-7 py-5 text-left">
          <div>
            <div>
              1. Why are you unsubscribing from Smooth? <br />
              <span className="text-xs"> (Select all that apply)</span>
            </div>
            <div className="ml-5 flex flex-col gap-2 text-sm">
              {options.map((option) => (
                <AnswerOption
                  option={option}
                  key={option}
                  isSelected={selectedOptions.includes(option)}
                  onOptionChange={handleOptionChange}
                />
              ))}
              <div className="flex flex-row gap-3">
                <input
                  type="checkbox"
                  checked={otherOptionSelected}
                  onChange={() => setOtherOptionSelected(!otherOptionSelected)}
                />
                <div>Other:</div>

                <input
                  type="text"
                  value={otherOption}
                  onChange={handleOtherOptionChange}
                  disabled={!otherOptionSelected}
                  placeholder="Please specify"
                  className="w-full border-b border-gray-300 bg-transparent pl-1 outline-none focus:border-b focus:border-gray-900 dark:border-gray-500 dark:focus:border-gray-200"
                />
              </div>
            </div>
          </div>
          <div>
            <div>2. What can we do to improve your experience with Smooth?</div>
            <input
              type="text"
              value={improvementsFeedback}
              onChange={(e) => setImprovementsFeedback(e.target.value)}
              placeholder="Please specify"
              className="w-full border-b border-gray-300 bg-transparent pl-1 text-sm outline-none focus:border-b focus:border-gray-900 dark:border-gray-500 dark:focus:border-gray-200"
            />
          </div>
        </div>
      </div>
      <div>
        <Button onPress={handleNextStep}>Next</Button>
        <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
          Cancel
        </Button>
      </div>
    </>
  )
}

interface AnswerOptionProps {
  option: string
  isSelected: boolean
  onOptionChange: (option: string, isSelected: boolean) => void
}

function AnswerOption({
  option,
  isSelected,
  onOptionChange,
}: AnswerOptionProps) {
  const handleChange = () => {
    onOptionChange(option, !isSelected)
  }

  return (
    <div className="flex flex-row gap-3">
      <input type="checkbox" checked={isSelected} onChange={handleChange} />
      <div>{option}</div>
    </div>
  )
}
