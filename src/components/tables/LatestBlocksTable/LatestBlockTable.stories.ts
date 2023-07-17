import { LatestBlocksTable } from '.'
import type { Block } from '../types'
import type { Meta, StoryObj } from '@storybook/react'

const data: Block[] = [
  {
    slot: 1,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'mev',
    reward: 0.32,
    blockType: 'okpoolproposal',
  },
  {
    slot: 2,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'vanila',
    reward: 2.12,
    blockType: 'missedproposal',
  },
  {
    slot: 3,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'mev',
    reward: 0.32,
    blockType: 'wrongfeerecipient',
  },
  {
    slot: 4,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'mev',
    reward: 0.32,
    blockType: 'okpoolproposal',
  },
  {
    slot: 5,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'vanila',
    reward: 2.12,
    blockType: 'missedproposal',
  },
  {
    slot: 6,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'mev',
    reward: 0.32,
    blockType: 'wrongfeerecipient',
  },
  {
    slot: 7,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'mev',
    reward: 0.32,
    blockType: 'okpoolproposal',
  },
  {
    slot: 8,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'vanila',
    reward: 2.12,
    blockType: 'missedproposal',
  },
  {
    slot: 9,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'mev',
    reward: 0.32,
    blockType: 'wrongfeerecipient',
  },
  {
    slot: 10,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'mev',
    reward: 0.32,
    blockType: 'okpoolproposal',
  },
  {
    slot: 11,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'vanila',
    reward: 2.12,
    blockType: 'missedproposal',
  },
  {
    slot: 12,
    proposer: {
      withdrawalAddress: '0x00005ea00ac477b1030ce78506496e8c2de24bf5',
      validatorKey:
        '0xa62c5914723e36eef425e1ada8b42aa24d2b1fd4f3025e5fc814f78212b7edfd3dfc5e09609de0d6a3de28d3a10bc7cb',
      validatorIndex: 1,
    },
    rewardType: 'mev',
    reward: 0.32,
    blockType: 'wrongfeerecipient',
  },
]

const meta: Meta<typeof LatestBlocksTable> = {
  title: 'table/LatestBlocksTable',
  component: LatestBlocksTable,
}

export default meta
type Story = StoryObj<typeof LatestBlocksTable>

export const Primary: Story = {
  args: {
    isLoading: false,
    data,
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
