/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import { WagmiProvider } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { mainnet, holesky } from 'wagmi/chains'
import { SELECTED_CHAIN } from '@/utils/config'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
}

const WEB3_CHAINS = [SELECTED_CHAIN === 'mainnet' ? mainnet : holesky] as const
const chains = WEB3_CHAINS 

const metadata = {
  name: 'Dappnode Smooth',
  description:
    'Smooth is a dashboard for Ethereum validators to join and receive a share of block proposal fees, ensuring a more stable and predictable return on investment.',
  url: 'https://smooth.dappnode.io/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: true,
  metadata,
  defaultChain: SELECTED_CHAIN === 'mainnet' ? mainnet : holesky,
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
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      ) : null}
    </>
  )
}
