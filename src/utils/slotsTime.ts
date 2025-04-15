import { SELECTED_CHAIN } from '@/utils/config'

export const getSlotUnixTime = (slot: number) => {
  const genesisUnixTime = SELECTED_CHAIN === 'hoodi' ? 1695902400 : 1742212800
  return genesisUnixTime + slot * 12 // Each slot represents 12 seconds
}

export const daysSinceGivenSlot = (slot: number) => {
  const slotTime = getSlotUnixTime(slot)
  const currentTime = Math.floor(Date.now() / 1000)
  return Math.floor((currentTime - slotTime) / 86400)
}
