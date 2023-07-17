import { Header } from '.'
import { Web3Decorator } from 'storybook/decorators/Web3Decorator'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Header> = {
  title: 'layout/Header',
  component: Header,
}

export default meta
type Story = StoryObj<typeof Header>

export const Primary: Story = {
  decorators: [Web3Decorator],
}
