import { SELECTED_CHAIN } from '@/utils/config'

export const getSlotUnixTime = (slot: number) => {
    const genesisUnixTime = SELECTED_CHAIN === 'goerli' ? 1616508000 : 1606824023
    return genesisUnixTime + slot * 12 // Each slot represents 12 seconds
}