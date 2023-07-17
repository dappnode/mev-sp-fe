import { LastCheckpointCard } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LastCheckpointCard> = {
  title: 'cards/LastCheckpointCard',
  component: LastCheckpointCard,
}

export default meta
type Story = StoryObj<typeof LastCheckpointCard>

export const Primary: Story = {
  args: {
    lastCheckpoint: 5360178,
    nextCheckpoint: 5350176,
  },
}

export const Loading: Story = {
  args: {
    isError: false,
    isLoading: true,
  },
}

export const Error: Story = {
  args: {
    isError: true,
    isLoading: false,
  },
}
