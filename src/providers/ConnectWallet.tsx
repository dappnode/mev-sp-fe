/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import { WagmiConfig } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { mainnet, goerli } from 'wagmi/chains'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
}

// 2. Create wagmiConfig
const chains = [mainnet, goerli]

const metadata = {
  name: 'Dappnode Smooth',
  description: 'Dappnode Smooth',
  url: 'https://smooth.dappnode.io/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  enableAnalytics: true,
  metadata,
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
