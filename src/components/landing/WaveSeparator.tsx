import SeparatorSvg from './SvgSeparators'

interface WaveSeparatorProps {
  color: string
  number: number
  rotated?: boolean
  hasBg?: boolean
}

export default function WaveSeparator({
  color,
  number,
  rotated = false,
  hasBg = false,
}: WaveSeparatorProps) {
  return (
    <div className="absolute left-0 top-0 -mt-[1px] w-full overflow-hidden leading-none">
      <SeparatorSvg
        color={hasBg ? color : 'none'}
        number={number}
        rotated={rotated}
      />
    </div>
  )
}
