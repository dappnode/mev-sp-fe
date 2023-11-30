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
  name: 'Dappnode Smooth',
  description: 'Dappnode Smooth',
  url: 'https://smooth.dappnode.io/',
}

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  defaultChain: mainnet,
  themeVariables: {
    '--w3m-accent': 'linear-gradient(to right, #9731dd, #c237ea)',
    '--w3m-border-radius-master': '1px',
    '--w3m-z-index': 1000,
  },
})

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
