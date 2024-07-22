import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './ConnectWallet'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

interface ReactQueryProviderProps {
  children: React.ReactNode
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
    </WagmiProvider>
  )
}
