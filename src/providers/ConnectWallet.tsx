/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import { WagmiConfig } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import {
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  gnosis,
  fantom,
} from 'wagmi/chains'

const chains = [
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  gnosis,
  fantom,
]

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
