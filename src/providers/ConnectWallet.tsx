/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import { WagmiProvider, cookieStorage, createStorage  } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { mainnet, hoodi } from 'viem/chains'
import { SELECTED_CHAIN } from '@/utils/config'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
}

const WEB3_CHAINS = [SELECTED_CHAIN === 'mainnet' ? mainnet : hoodi] as const
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
