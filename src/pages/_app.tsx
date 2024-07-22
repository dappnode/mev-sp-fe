import '@/styles/globals.css'
import { Inter, Urbanist } from '@next/font/google'
import { useIsMounted } from '@/hooks/useIsMounted'
import { MainLayout } from '@/components/layout/MainLayout'
import { Seo } from '@/components/layout/Seo'
import { ReactQueryProvider } from '@/providers/ReactQuery'
import { NextThemeProvider } from '@/providers/ThemeProvider'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from '@/providers/ConnectWallet'
import { Account } from '@/providers/Account'
import { WalletOptions } from '@/providers/WalletOptions'
import type { AppProps } from 'next/app'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
})

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()
  return (
    <>
      <Seo />
      <WagmiProvider config={config}>
      <ReactQueryProvider>

          {isMounted && (
            <NextThemeProvider>
                    <ConnectWallet />

              <MainLayout
                className={`${inter.variable} ${urbanist.variable} font-inter`}>
                <Component {...pageProps} />
              </MainLayout>
            </NextThemeProvider>
          )}
        </ReactQueryProvider>
        </WagmiProvider>
        </>
  )
}
