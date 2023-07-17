export const toFixedNoTrailingZeros = (value: number, decimals: number) =>
  parseFloat(value.toFixed(decimals))
