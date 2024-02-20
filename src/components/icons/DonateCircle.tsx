import { CurrencyCircle } from '../images/currency-circle'
import { EthCircle } from '../images/eth-circle'

interface EthCircleProps {
  hasEth?: boolean
  size: number
}

export default function DonateCircle({ hasEth = false, size }: EthCircleProps) {
  return (
    <div className="relative">
      <div
        className="absolute left-2 top-2 rounded-full bg-yellow-300 opacity-20 blur-lg"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      <div className="relative">
        {hasEth ? <EthCircle size={size} /> : <CurrencyCircle size={size} />}
      </div>
    </div>
  )
}
