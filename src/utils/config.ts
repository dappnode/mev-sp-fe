const SUPPORTED_CHAINS = ['mainnet', 'holesky', 'hoodi'] as const

export type Chain = (typeof SUPPORTED_CHAINS)[number]

const selectedChain = process.env.NEXT_PUBLIC_SELECTED_CHAIN

if (!process.env.NEXT_PUBLIC_SMOOTHING_POOL_ADDRESS) {
  throw new Error('NEXT_PUBLIC_SMOOTHING_POOL_ADDRESS is not set')
}

if (!selectedChain) {
  throw new Error('NEXT_PUBLIC_SELECTED_CHAIN is not set')
}

if (!SUPPORTED_CHAINS.includes(selectedChain as Chain)) {
  throw new Error(
    'NEXT_PUBLIC_SELECTED_CHAIN is not one of the supported chains'
  )
}

export const SELECTED_CHAIN = selectedChain as Chain

export const SMOOTHING_POOL_ADDRESS = process.env
  .NEXT_PUBLIC_SMOOTHING_POOL_ADDRESS as `0x${string}`

export const GENESIS_CHAIN_TIMESTAMP: Record<Chain, number> = {
  mainnet: 1606824023,
  holesky: 1695902400,
  hoodi: 1742212800,
}

export const FEEDBACK_SCRIPT_URL = process.env.NEXT_PUBLIC_FEEDBACK_SCRIPT_URL

export const BEACON_CHAIN_URLS: Record<Chain, string> = {
  mainnet: 'https://beaconcha.in',
  holesky: 'https://holesky.beaconcha.in',
  hoodi: 'https://hoodi.beaconcha.in',
}

export const EL_EXPLORER_URLS: Record<Chain, string> = {
  mainnet: 'https://eth.blockscout.com',
  holesky: 'https://eth-holesky.blockscout.com',
  hoodi: 'https://eth-hoodi.blockscout.com',
}

export const getBeaconChainExplorer = (
  type: 'slot' | 'validator' | 'block' | 'tx',
  endpoint: string | number
): string => {
  const baseUrl = BEACON_CHAIN_URLS[SELECTED_CHAIN]
  return `${baseUrl}/${type}/${endpoint}`
}

export const SITE_NAME = `Smooth | Dappnode's MEV Smoothing Pool | Maximize your eth staking rewards`
export const SITE_DESCRIPTION = `Elevate your Ethereum solo staking experience and maximize your rewards with Smooth. Pool your MEV rewards seamlessly with other stakers and enjoy payouts from every block. Join Dappnode's MEV Smoothing Pool today!`
export const SITE_URL = 'https://smooth.dappnode.io/'
export const MAIN_SITE_URL = 'https://dappnode.com/'

export const SOCIAL_DISCORD = 'dappnode'
export const SOCIAL_TWITTER = 'dappnode'
export const SOCIAL_GITHUB = 'dappnode'
export const SOCIAL_LINKEDIN = 'dappnode'

export const PAGES = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Donate',
    path: '/donate',
  },
  {
    name: 'Documentation',
    path: 'https://docs.dappnode.io/docs/smooth',
  },
  {
    name: 'Stats',
    path: '/stats',
  },
]

export const SOCIALS = [
  {
    name: 'LinkedIn',
    path: `https://www.linkedin.com/company/${SOCIAL_LINKEDIN}`,
  },
  {
    name: 'Discord',
    path: `https://discord.gg/${SOCIAL_DISCORD}`,
  },
  {
    name: 'GitHub',
    path: `https://github.com/${SOCIAL_GITHUB}`,
  },
  {
    name: 'Twitter',
    path: `https://twitter.com/${SOCIAL_TWITTER}`,
  },
] as const

export const IRON_SESSION_CONFIG = {
  cookieName: `siwe ${SITE_NAME}`,
  password:
    process.env.IRON_SESSION_PASSWORD ??
    // UPDATE fallback password
    'complex_password_at_least_32_characters_long',
  cookieOptions: {
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    secure: process.env.NODE_ENV === 'production',
  },
}

export const CLAIM_FEEDBACK_TIMESTAMP = 'claimFeedbackTimestamp'
