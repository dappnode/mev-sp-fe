import { BaseDialog } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BaseDialog> = {
  title: 'dialogs/BaseDialog',
  component: BaseDialog,
}

export default meta
type Story = StoryObj<typeof BaseDialog>

export const Primary: Story = {
  args: {
    triggerText: 'Click me',
  },
}
