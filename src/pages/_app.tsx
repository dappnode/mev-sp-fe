import '@/styles/globals.css'
import { Inter, Urbanist } from 'next/font/google';
import { useIsMounted } from '@/hooks/useIsMounted'
import { MainLayout } from '@/components/layout/MainLayout'
import { Seo } from '@/components/layout/Seo'
import { ReactQueryProvider } from '@/providers/ReactQuery'
import { ConnectWallet } from '@/providers/ConnectWallet'
import { NextThemeProvider } from '@/providers/ThemeProvider'
import type { AppProps } from 'next/app'

const inter = Inter({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-inter',
});

const urbanist = Urbanist({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-urbanist',
});

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()
  return (
    <>
      <Seo />
      <ConnectWallet>
        <ReactQueryProvider>
          {isMounted && (
            <NextThemeProvider>
              <MainLayout
                className={`${inter.variable} ${urbanist.variable} font-inter`}>
                <Component {...pageProps} />
              </MainLayout>
            </NextThemeProvider>
          )}
        </ReactQueryProvider>
      </ConnectWallet>
    </>
  )
}
