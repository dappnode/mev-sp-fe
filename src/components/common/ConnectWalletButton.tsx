import { Button } from './Button'
import React from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'

const SUPPORTED_CHAINS = ['mainnet', 'goerli']

if (!process.env.NEXT_PUBLIC_SELECTED_CHAIN) {
  throw new Error('NEXT_PUBLIC_SELECTED_CHAIN is not set')
}

if (!SUPPORTED_CHAINS.includes(process.env.NEXT_PUBLIC_SELECTED_CHAIN)) {
  throw new Error(
    'NEXT_PUBLIC_SELECTED_CHAIN is not one of the supported chains'
  )
}

export const SELECTED_CHAIN = process.env.NEXT_PUBLIC_SELECTED_CHAIN
export function ConnectWalletButton() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { selectedNetworkId } = useWeb3ModalState()
  const { disconnect } = useDisconnect()
  const { open } = useWeb3Modal()

  const connected =
    !isConnecting &&
    !isDisconnected &&
    address &&
    selectedNetworkId &&
    SUPPORTED_CHAINS.includes(selectedNetworkId)

  const handleConnect = async () => {
    try {
      await open()
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('Failed to disconnect:', error)
    }
  }

  if (!connected) {
    return (
      <Button
        buttonType="primary"
        className="min-w-[160px] max-w-fit"
        onPress={handleConnect}>
        Connect Wallet
      </Button>
    )
  }

  return (
    <Button
      buttonType="secondary"
      className="max-w-fit"
      color={SUPPORTED_CHAINS.includes(selectedNetworkId) ? 'gray' : 'red'}
      onPress={handleDisconnect}>
      {SUPPORTED_CHAINS.includes(selectedNetworkId) ? address : 'Wrong Network'}
    </Button>
  )
}
