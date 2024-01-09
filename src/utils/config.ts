const SUPPORTED_CHAINS = ['mainnet', 'goerli']

if (!process.env.NEXT_PUBLIC_SMOOTHING_POOL_ADDRESS) {
  throw new Error('NEXT_PUBLIC_SMOOTHING_POOL_ADDRESS is not set')
}

if (!process.env.NEXT_PUBLIC_SELECTED_CHAIN) {
  throw new Error('NEXT_PUBLIC_SELECTED_CHAIN is not set')
}

if (!SUPPORTED_CHAINS.includes(process.env.NEXT_PUBLIC_SELECTED_CHAIN)) {
  throw new Error(
    'NEXT_PUBLIC_SELECTED_CHAIN is not one of the supported chains'
  )
}

export const SELECTED_CHAIN = process.env.NEXT_PUBLIC_SELECTED_CHAIN

export const SMOOTHING_POOL_ADDRESS = process.env
  .NEXT_PUBLIC_SMOOTHING_POOL_ADDRESS as `0x${string}`

export const getBeaconChainExplorer = (
  type: 'slot' | 'validator' | 'block' | 'tx',
  endpoint: string | number
) => {
  const baseUrl =
    SELECTED_CHAIN === 'mainnet'
      ? 'https://beaconcha.in'
      : 'https://prater.beaconcha.in'

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
    name: 'Dashboard',
    path: '/',
  },
  {
    name: 'Why Smooth',
    path: '/how-to',
  },
  {
    name: 'Donate',
    path: '/donate',
  },
  {
    name: 'How to use',
    path: 'https://docs.dappnode.io/docs/smooth/subscribe-to-smooth/manual',
  },
  {
    name: 'Documentation',
    path: 'https://docs.dappnode.io/docs/smooth',
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
