/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import { WagmiProvider } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'
import { createAppKit } from '@reown/appkit/react'
import { mainnet, hoodi } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { Config } from '@wagmi/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
  projectId
})

createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, hoodi],
  metadata: metadata,
  projectId,
  features: {
    analytics: true,
  }
 })
 const wagmiConfig: Config = wagmiAdapter.wagmiConfig;

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
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
          {children}
          </QueryClientProvider>
        </WagmiProvider>
      ) : null}
    </>
  )
}
