import { TotalStakedEthCard } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TotalStakedEthCard> = {
  title: 'cards/TotalStakedEthCard',
  component: TotalStakedEthCard,
}

export default meta
type Story = StoryObj<typeof TotalStakedEthCard>

export const Primary: Story = {
  args: {
    totalStakedEth: 42180,
    subscribers: 862,
    isError: false,
    isLoading: false,
  },
}

export const Loading: Story = {
  args: {
    totalStakedEth: 42180,
    subscribers: 862,
    isError: false,
    isLoading: true,
  },
}

export const Error: Story = {
  args: {
    totalStakedEth: 42180,
    subscribers: 862,
    isError: true,
    isLoading: false,
  },
}
