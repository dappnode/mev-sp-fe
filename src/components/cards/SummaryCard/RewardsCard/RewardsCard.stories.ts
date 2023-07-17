import { RewardsCard } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof RewardsCard> = {
  title: 'cards/RewardsCard',
  component: RewardsCard,
}

export default meta
type Story = StoryObj<typeof RewardsCard>

export const AverageRewards: Story = {
  args: {
    title: 'Average Rewards',
    tooltip: 'Average rewards over the last 30 days',
    ethRewardWei: '127222101808644357',
    secondaryRewardTitle: 'SP Average',
    secondaryRewardWei: '227222101808644357',
    isError: false,
    isLoading: false,
  },
}

export const AverageRewardsLoading: Story = {
  args: {
    title: 'Average Rewards',
    tooltip: 'Average rewards over the last 30 days',
    secondaryRewardTitle: 'SP Average',
    isError: false,
    isLoading: true,
  },
}

export const AverageRewardsError: Story = {
  args: {
    title: 'Average Rewards',
    tooltip: 'Average rewards over the last 30 days',
    secondaryRewardTitle: 'SP Average',
    isError: true,
    isLoading: false,
  },
}

export const TotalRewardsPrimary: Story = {
  args: {
    title: 'Total Rewards',
    tooltip: 'Total rewards over the last 30 days',
    ethRewardWei: '9549400000000000000',
    secondaryRewardTitle: 'Last 7 days',
    secondaryRewardWei: '1204000000000000000',
    isError: false,
    isLoading: false,
  },
}

export const TotalRewardsLoading: Story = {
  args: {
    title: 'Total Rewards',
    tooltip: 'Total rewards over the last 30 days',
    secondaryRewardTitle: 'Last 7 days',
    isError: false,
    isLoading: true,
  },
}

export const TotalRewardsError: Story = {
  args: {
    title: 'Total Rewards',
    tooltip: 'Total rewards over the last 30 days',
    secondaryRewardTitle: 'Last 7 days',
    isError: true,
    isLoading: false,
  },
}
