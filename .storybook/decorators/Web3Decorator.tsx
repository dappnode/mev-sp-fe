import React from 'react'
import type { StoryFn } from '@storybook/react'
import { ConnectWallet } from '@/providers/ConnectWallet'

export const Web3Decorator = (Story: StoryFn) => (
  <ConnectWallet>
    <Story />
  </ConnectWallet>
)
