import '@/styles/globals.css'
import { Inter, Urbanist } from '@next/font/google'
import { useIsMounted } from '@/hooks/useIsMounted'
import { MainLayout } from '@/components/layout/MainLayout'
import { Seo } from '@/components/layout/Seo'
import { ReactQueryProvider } from '@/providers/ReactQuery'
import { ConnectWallet } from '@/providers/ConnectWallet'
import type { AppProps } from 'next/app'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
})

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()
  return (
    <>
      <Seo />
      <ConnectWallet>
        <ReactQueryProvider>
          {isMounted && (
            <MainLayout
              className={`${inter.variable} ${urbanist.variable} font-inter`}>
              <Component {...pageProps} />
            </MainLayout>
          )}
        </ReactQueryProvider>
      </ConnectWallet>
    </>
  )
}
