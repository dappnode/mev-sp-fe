/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import { WagmiConfig } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { mainnet, goerli } from 'wagmi/chains'

const SUPPORTED_CHAINS = ['mainnet', 'goerli']

if (!process.env.NEXT_PUBLIC_SMOOTHING_POOL_ADDRESS) {
  throw new Error('NEXT_PUBLIC_SMOOTHING_POOL_ADDRESS is not set')
}

if (!process.env.NEXT_PUBLIC_SELECTED_CHAIN) {
  throw new Error('NEXT_PUBLIC_SELECTED_CHAIN is not set')
}

if (!SUPPORTED_CHAINS.includes(process.env.NEXT_PUBLIC_SELECTED_CHAIN)) {
  throw new Error(
    'NEXT_PUBLIC_SELECTED_CHAIN is not one of the supported chains'
  )
}

export const SELECTED_CHAIN = process.env.NEXT_PUBLIC_SELECTED_CHAIN

export const SMOOTHING_POOL_ADDRESS = process.env
  .NEXT_PUBLIC_SMOOTHING_POOL_ADDRESS as `0x${string}`

export const WEB3_CHAINS = [SELECTED_CHAIN === 'mainnet' ? mainnet : goerli]

const chains = WEB3_CHAINS

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ''

const metadata = {
  name: 'Next Starter Template',
  description: 'A Next.js starter template with Web3Modal v3 + Wagmi',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

interface Web3ProviderProps {
  children: ReactNode
}

export function ConnectWallet({ children }: Web3ProviderProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      ) : null}
    </>
  )
}
