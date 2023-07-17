import React from 'react'
import type { StoryFn } from '@storybook/react'
import { Web3Provider } from '../../src/providers/Web3'

export const Web3Decorator = (Story: StoryFn) => (
  <Web3Provider>
    <Story />
  </Web3Provider>
)
