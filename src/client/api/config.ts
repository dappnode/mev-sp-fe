export const baseUrl = '/api/'

export const endpoints = {
  config: 'config',
  status: 'status',
  statistics: 'memory/statistics/',
  allBlocks: 'memory/allblocks',
  allDonations: 'memory/donations',
  proposedBlocks: 'memory/proposedblocks',
  validators: 'memory/validators',
  registeredRelays: (validatorKey: `0x${string}`) =>
    `registeredrelays/${validatorKey}`,
  onchainProof: (address: `0x${string}`) => `onchain/proof/${address}`,
  memoryValidator: (index: number) => `memory/validator/${index}`,
  memoryValidators: (address: `0x${string}`) => `memory/validators/${address}`,
}
