import SeparatorSvg from './SvgSeparators'

interface WaveSeparatorProps {
  color: string
  number: number
  rotated?: boolean
}

export default function WaveSeparator({
  color,
  number,
  rotated = false,
}: WaveSeparatorProps) {
  return (
    <div className="absolute left-0 top-0 w-full overflow-hidden leading-none ">
      <SeparatorSvg color={color} number={number} rotated={rotated} />
    </div>
  )
}
