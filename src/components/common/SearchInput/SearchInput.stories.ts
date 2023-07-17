import { SearchInput } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SearchInput> = {
  title: 'common/SearchInput',
  component: SearchInput,
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Primary: Story = {
  args: {
    placeholder: 'Search',
  },
}
