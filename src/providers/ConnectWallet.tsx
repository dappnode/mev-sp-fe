/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import { WagmiProvider } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'

import { createAppKit } from '@reown/appkit/react'
import { mainnet, hoodi } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// import { Config } from '@wagmi/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import {
  SELECTED_CHAIN,
} from '@/utils/config'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
}

const metadata = {
  name: 'Dappnode Smooth',
  description:
    'Smooth is a dashboard for Ethereum validators to join and receive a share of block proposal fees, ensuring a more stable and predictable return on investment.',
  url: 'https://smooth.dappnode.io/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const queryClient = new QueryClient()
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, hoodi],
  projectId,
  ssr: true
})

const network = SELECTED_CHAIN === 'mainnet' ? mainnet : hoodi

createAppKit({
  adapters: [wagmiAdapter],
  networks: [network],
  defaultNetwork : network,
  metadata,
  projectId,
  features: {
    analytics: true,
    email: false,
    onramp: false,
    swaps: false,
    socials: false,
  },
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
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>
          {children}
          </QueryClientProvider>
        </WagmiProvider>
      ) : null}
    </>
  )
}
