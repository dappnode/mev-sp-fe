/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import { http, createConfig } from 'wagmi'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { mainnet, holesky } from 'wagmi/chains'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
}

export const config = createConfig({
  chains: [mainnet, holesky],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [holesky.id]: http(),
  }
})

// interface Web3ProviderProps {
//   children: ReactNode
// }

// export function ConnectWallet({ children }: Web3ProviderProps) {
//   const [ready, setReady] = useState(false)

//   useEffect(() => {
//     setReady(true)
//   }, [])

//   return (
//     <>
//       {ready ? (
//         <WagmiProvider config={config}>{children}</WagmiProvider>
//       ) : null}
//     </>
//   )
// }
