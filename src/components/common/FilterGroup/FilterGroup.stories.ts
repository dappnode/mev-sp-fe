import { FilterGroup } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof FilterGroup> = {
  title: 'common/FilterGroup',
  component: FilterGroup,
}

export default meta
type Story = StoryObj<typeof FilterGroup>

export const BlockType: Story = {
  args: {
    title: 'Block Type',
    options: [
      {
        label: 'All',
        value: 'all',
      },
      {
        label: 'Proposed',
        value: 'proposed',
      },
      {
        label: 'Wrong Fee',
        value: 'wrongFee',
      },
      {
        label: 'Missed',
        value: 'missed',
      },
    ],
  },
}
