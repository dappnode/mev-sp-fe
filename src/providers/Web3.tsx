import { ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
import {
  trustWallet,
  ledgerWallet,
  safeWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
  gnosis,
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    gnosis,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
)

console.log('Chains:', chains)
console.log('Public Client:', publicClient)
console.log('WebSocket Public Client:', webSocketPublicClient)

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'defaultProjectId'

const { wallets } = getDefaultWallets({
  appName: 'Dappnode Smooth',
  projectId,
  chains,
})

const demoAppInfo = {
  appName: 'Dappnode Smooth',
}

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      safeWallet({ chains }),
    ],
  },
])

console.log('Wallets:', wallets)

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
