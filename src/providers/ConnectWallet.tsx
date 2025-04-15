/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import { WagmiProvider, cookieStorage, createStorage  } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { mainnet } from 'viem/chains'
import { defineChain } from 'viem'
import { SELECTED_CHAIN } from '@/utils/config'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
} 

export const hoodiCustom = defineChain({
  id: 560048,
  name: 'Hoodi',
  nativeCurrency: { name: 'Hoodi Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://ethereum-hoodi-rpc.publicnode.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://hoodi.etherscan.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 2589,
    },
  },
  testnet: true,
})

const WEB3_CHAINS = [SELECTED_CHAIN === 'mainnet' ? mainnet : hoodiCustom] as const
const chains = WEB3_CHAINS

const metadata = {
  name: 'Dappnode Smooth',
  description:
    'Smooth is a dashboard for Ethereum validators to join and receive a share of block proposal fees, ensuring a more stable and predictable return on investment.',
  url: 'https://smooth.dappnode.io/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  auth: {
    email: false, 
  },
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: false,
  enableSwaps: false,
  metadata,
  themeVariables: {
    '--w3m-accent': '#9333EA', 
    '--w3m-z-index': 1000, // Just in case, set the z-index to a high value
  }
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
        <WagmiProvider config={config}>{children}</WagmiProvider>
      ) : null}
    </>
  )
}
