import { MyRewards } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MyRewards> = {
  title: 'cards/MyRewards',
  component: MyRewards,
}

export default meta
type Story = StoryObj<typeof MyRewards>

export const Primary: Story = {
  args: {
    totalAccumulatedRewards: 4.94,
    claimableRewards: 1.0242,
    pendingRewards: 0.19123,
  },
}

export const Disabled: Story = {
  args: {
    totalAccumulatedRewards: 4.94,
    claimableRewards: 1.0242,
    pendingRewards: 0.19123,
    isDisabled: true,
  },
}

export const Loading: Story = {
  args: {
    totalAccumulatedRewards: 4.94,
    claimableRewards: 1.0242,
    pendingRewards: 0.19123,
    isLoading: true,
  },
}
