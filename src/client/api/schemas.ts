import { z } from 'zod'

export const BlockSchema = z.object({
  block: z.number(),
  slot: z.number(),
  validatorIndex: z.number(),
  validatorKey: z.string(),
  blockType: z.union([
    z.literal('okpoolproposal'),
    z.literal('okpoolproposalblskeys'),
    z.literal('missedproposal'),
    z.literal('wrongfeerecipient'),
  ]),
  rewardWei: z.string(),
  rewardType: z.union([
    z.literal('vanila'),
    z.literal('mev'),
    z.literal('unknownrewardtype'),
    z.literal(''),
  ]),
  withdrawalAddress: z.string(),
})

export const DonationSchema = z.object({
  amountWei: z.string(),
  blockNumber: z.number(),
  txHash: z.string(),
  sender: z.string(),
})

export const ValidatorSchema = z.object({
  status: z.string(),
  accumulatedRewardsWei: z.string().or(z.null()),
  pendingRewardsWei: z.string().or(z.null()),
  collateralWei: z.string().or(z.null()),
  withdrawalAddress: z.string(),
  validatorIndex: z.number(),
  validatorKey: z.string(),
})

export const singleValidatorByIndexSchema = z.object({
  status: z.string(),
  accumulatedRewardsWei: z.number().or(z.null()),
  pendingRewardsWei: z.number().or(z.null()),
  collateralWei: z.number().or(z.null()),
  withdrawalAddress: z.string(),
  validatorIndex: z.number(),
  validatorKey: z.string(),
})

export const StatusSchema = z.object({
  isConsensusInSync: z.boolean(),
  isExecutionInSync: z.boolean(),
  isOracleInSync: z.boolean(),
  latestProcessedSlot: z.number(),
  latestProcessedBlock: z.number(),
  latestFinalizedEpoch: z.number(),
  latestFinalizedSlot: z.number(),
  oracleSyncDistanceSlots: z.number(),
  nextCheckpointSlot: z.number(),
  nextCheckpointTime: z.string(),
  nextCheckpointRemaining: z.string(),
  nextCheckpointRemainingUnix: z.number(),
  previousCheckpointSlot: z.number(),
  previousCheckpointTime: z.string(),
  previousCheckpointAge: z.string(),
  previousCheckpointAgeUnix: z.number(),
  consensusChainid: z.string(),
  executionChainid: z.string(),
  depositcontract: z.string(),
})

export const StatisticsSchema = z.object({
  totalSubscribedValidators: z.number(),
  totalActiveValidators: z.number(),
  totalYellowcardValidators: z.number(),
  totalRedcardValidators: z.number(),
  totalBannedValidators: z.number(),
  totalNotsubscribedValidators: z.number(),
  latestCheckpointSlot: z.number(),
  nextCheckpointSlot: z.number(),
  totalAccumulatedRewardsWei: z.string(),
  totalPendingRewardsWei: z.string(),
  totalRewardsSentWei: z.string(),
  totalRewardsSent30daysWei: z.string(),
  rewardsPerValidatorPer30daysWei: z.string(),
  totalDonationsWei: z.string(),
  avgBlockRewardWei: z.string(),
  totalProposedBlocks: z.number(),
  totalMissedBlocks: z.number(),
  totalWrongfeeBlocks: z.number(),
})

export const onChainProofSchema = z.object({
  leafWithdrawalAddress: z.string(),
  leafAccumulatedBalance: z.string(),
  merkleroot: z.string(),
  checkpointSlot: z.number(),
  merkleProofs: z.array(z.string()),
  registeredValidators: z.array(z.number()),
  totalAccumulatedRewardsWei: z.string().or(z.null()),
  alreadyClaimedRewardsWei: z.string().or(z.null()),
  claimableRewardsWei: z.string().or(z.null()),
  pendingRewardsWei: z.string().or(z.null()),
})

export const ConfigSchema = z.object({
  consensusEndpoint: z.string().optional(),
  executionEndpoint: z.string().optional(),
  network: z.string(),
  poolAddress: z.string(),
  deployedSlot: z.number(),
  checkpointSize: z.number(),
  poolFeesPercent: z.number(),
  poolFeesAddress: z.string(),
  dryRun: z.boolean(),
  numRetries: z.number().optional(),
  collateralInWei: z.string(),
})

const relayerSchema = z.object({
  relayAddress: z.string(),
  feeRecipient: z.string(),
  timestamp: z.string(),
})

export const registeredRelaysSchema = z.object({
  correctFeeRecipients: z.boolean().optional(),
  correctFeeRelayers: z.array(relayerSchema).or(z.null()).optional(),
  wrongFeeRelayers: z.array(relayerSchema).or(z.null()).optional(),
  unregisteredRelayers: z.array(relayerSchema).or(z.null()).optional(),
})
