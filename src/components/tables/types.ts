import type { Warnings } from './MyValidatorsTable/components/WarningIcon'

export interface Block {
  slot: number
  date: string
  proposer: Proposer
  rewardType: 'vanila' | 'mev' | 'unknownrewardtype' | ''
  reward: number
  blockType:
    | 'okpoolproposal'
    | 'okpoolproposalblskeys'
    | 'missedproposal'
    | 'wrongfeerecipient'
}

export interface Donation {
  txHash: string
  sender: string
  reward: number
  blockNumber: number
}

interface Proposer {
  withdrawalAddress: `0x${string}`
  validatorKey: `0x${string}`
  validatorIndex: number
}

export interface Validator {
  address: `0x${string}`
  balance: number
  pending: number
  validatorId: number
  validatorKey: `0x${string}`
  accumulated: number
  warning: Warnings
  subscribed: boolean
  checkbox: boolean
  proposals: number
}

export type TableDataTypes = Validator | Block | Donation
