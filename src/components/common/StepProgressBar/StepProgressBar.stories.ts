import { StepProgressBar } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof StepProgressBar> = {
  title: 'common/StepProgressBar',
  component: StepProgressBar,
}

export default meta
type Story = StoryObj<typeof StepProgressBar>

export const Primary: Story = {
  args: {
    steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    currentStep: 0,
  },
}
