import { DonateDialog } from '.'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof DonateDialog> = {
  title: 'dialogs/DonateDialog',
  component: DonateDialog,
}

export default meta
type Story = StoryObj<typeof DonateDialog>

export const Primary: Story = {}
