import { Button } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  title: 'common/Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    buttonType: 'primary',
    children: 'Button',
  },
}

export const PrimaryDisabled: Story = {
  args: {
    buttonType: 'primary',
    children: 'Button',
    isDisabled: true,
  },
}

export const Secondary: Story = {
  args: {
    buttonType: 'secondary',
    children: 'Button',
  },
}

export const SecondaryDisabled: Story = {
  args: {
    buttonType: 'secondary',
    children: 'Button',
    isDisabled: true,
  },
}

export const Warning: Story = {
  args: {
    buttonType: 'secondary',
    color: 'red',
    children: 'Button',
  },
}

export const WarningDisabled: Story = {
  args: {
    buttonType: 'secondary',
    color: 'red',
    children: 'Button',
    isDisabled: true,
  },
}
