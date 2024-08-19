import clsx from 'clsx'
import { BsCheck } from 'react-icons/bs'
import { motion } from 'framer-motion'

export interface StepProgressBarProps {
  steps: string[]
  currentStep: number
}

type StepStatus = 'selected' | 'completed' | 'unselected'

export function StepProgressBar({ steps, currentStep }: StepProgressBarProps) {
  return (
    <div className="flex h-10 w-full items-center justify-between">
      {steps.map((step, index) => {
        const status: StepStatus =
          index < currentStep
            ? 'completed'
            : index === currentStep
            ? 'selected'
            : 'unselected'

        return (
          <div
            key={step}
            className="relative flex w-full flex-col items-center">
            {index !== 0 && (
              <div
                className={clsx(
                  'absolute left-0 top-2 z-0 h-[2px] w-1/2',
                  status === 'unselected'
                    ? 'bg-DAppGray'
                    : 'bg-DAppPurple-900 dark:text-violet-500'
                )}
              />
            )}
            {index !== steps.length - 1 && (
              <div
                className={clsx(
                  'absolute right-0 top-2 z-0 h-[2px] w-1/2',
                  status === 'completed'
                    ? 'bg-DAppPurple-900 dark:text-violet-500'
                    : 'bg-DAppGray'
                )}
              />
            )}
            <motion.div
              animate={status}
              initial={false}
              variants={variants}
              className={clsx(
                'z-10 flex h-4 w-4 place-content-center rounded-full border-4',
                status === 'selected'
                  ? 'border-DAppPurple-900 bg-white dark:border-violet-500'
                  : status === 'completed'
                  ? 'border-none bg-DAppPurple-900 dark:bg-violet-500'
                  : 'border-DAppLight bg-DAppGray'
              )}>
              {status === 'completed' && <BsCheck className="text-white" />}
            </motion.div>
            <p
              className={clsx(
                'mx-1 mt-1 h-8 text-center text-xs font-normal',
                status === 'unselected'
                  ? 'text-DAppGray'
                  : 'text-DAppPurple-900 dark:text-violet-500'
              )}>
              {step}
            </p>
          </div>
        )
      })}
    </div>
  )
}

const variants = {
  completed: {
    scale: 1,
    transition: {
      duration: 0.4,
      type: 'spring',
      stiffness: 400,
      damping: 30,
    },
  },
  selected: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
  unselected: {
    scale: 0.95,
    transition: {
      duration: 0.4,
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
}
