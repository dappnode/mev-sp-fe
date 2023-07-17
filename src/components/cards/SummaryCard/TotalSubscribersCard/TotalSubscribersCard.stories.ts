import { TotalSubscribersCard } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TotalSubscribersCard> = {
  title: 'cards/TotalSubscribersCard',
  component: TotalSubscribersCard,
}

export default meta
type Story = StoryObj<typeof TotalSubscribersCard>

export const Primary: Story = {
  args: {
    subscribers: 3789,
    isError: false,
    isLoading: false,
  },
}

export const Loading: Story = {
  args: {
    subscribers: 3789,
    isError: false,
    isLoading: true,
  },
}

export const Error: Story = {
  args: {
    subscribers: 3789,
    isError: true,
    isLoading: false,
  },
}
