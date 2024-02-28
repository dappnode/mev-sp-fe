interface SeparatorSvgProps {
  color: string
  number: number
  rotated: boolean
}

const SvgsPaths: string[] = [
  'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z',
  'M 482.085 56.44 c 87 -10.79 171.24 -30.13 258 -41.86 c 123.585 -16.72 252.285 -17.73 375.675 -0.39 C 1235.67 31 1360.005 72 1478.49 92.83 c 105.075 18.48 219.795 26.09 321.51 3 V 0 H 0 V 27.35 A 900.315 600.21 0 0 0 482.085 56.44 Z',
  'M 385.668 56.44 c 69.6 -10.79 136.992 -30.13 206.4 -41.86 c 98.868 -16.72 201.828 -17.73 300.54 -0.39 C 988.536 31 1088.004 72 1182.792 92.83 c 84.06 18.48 175.836 26.09 257.208 3 V 0 H 0 V 27.35 A 720.252 600.21 0 0 0 385.668 56.44 Z',
]

export default function SeparatorSvg({
  color,
  number,
  rotated,
}: SeparatorSvgProps) {
  const rotation = rotated ? { transform: 'rotateY(180deg)' } : undefined
  return (
    <svg
      className="transition-colors duration-1000 ease-in-out"
      fill={color}
      preserveAspectRatio="none"
      style={rotation}
      viewBox="0 0 1200 120"
      xmlns="http://www.w3.org/2000/svg">
      <path d={SvgsPaths[number]} />
    </svg>
  )
}
