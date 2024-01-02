/* eslint-disable react/jsx-no-useless-fragment */
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { walletConnectProvider } from '@web3modal/wagmi'
import { publicProvider } from '@wagmi/core/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { mainnet, goerli } from 'wagmi/chains'
import { SELECTED_CHAIN } from '@/utils/config'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
}

const selectedChain = SELECTED_CHAIN === 'mainnet' ? mainnet : goerli
const web3Chains = [selectedChain]

const { chains, publicClient } = configureChains(web3Chains, [
  walletConnectProvider({ projectId }),
  publicProvider(),
])

const metadata = {
  name: 'Dappnode Smooth',
  description:
    'Smooth is a dashboard for Ethereum validators to join and receive a share of block proposal fees, ensuring a more stable and predictable return on investment.',
  url: 'https://smooth.dappnode.io/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: metadata.name },
    }),
  ],
  publicClient,
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
