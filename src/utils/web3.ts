import { BigNumber, utils } from 'ethers'

/**
 * Shorten Ethereum address to 0x123...456 format
 * @param address Ethereum address
 * @param leftSideLength Amount of characters to show on the left side of the ellipsis
 * @param rightSideLength Amount of characters to show on the right side of the ellipsis
 * @returns Shortened Ethereum address
 * @example
 * shortenEthAddress('0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5')
 * // => '0x9522...BAfe5'
 * shortenEthAddress('0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5', 6, 6)
 * // => '0x952222...CC4BAfe5'
 * shortenEthAddress('0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5', 6, 0)
 * // => '0x952222...'
 */
// Add the possibility for the user to select the amount of characters to show on each side of the ellipsis
export const shortenEthAddress = (
  address: `0x${string}` | string | undefined,
  leftSideLength = 4,
  rightSideLength = 4
) => {
  if (!address) {
    return ''
  }
  return `${address.slice(0, leftSideLength + 2)}...${
    rightSideLength === 0 ? '' : address.slice(-rightSideLength)
  }`
}

/**
 * Add ETH suffix to number
 * @param value Number
 * @returns Formatted number string (1.23 ETH)
 * @example
 * addEthSuffix(1.23)
 * // => '1.23 ETH'
 */
export const addEthSuffix = (value: number | string) => `${value} ETH`

/*
 * Convert wei to ether
 * @param wei Wei value
 * @returns Ether value as a number. Returns 0 if number is undefined
 * @example
 * weiToEth(1234567890000000000)
 * // => 1.23456789
 * weiToEth(undefined)
 * // => 0
 */
export const weiToEth = (wei: string | number | undefined | null) => {
  if (!wei) return 0
  const weiAsBigNumber = BigNumber.from(String(wei))
  const etherAsString = utils.formatEther(weiAsBigNumber)
  return parseFloat(etherAsString)
}
