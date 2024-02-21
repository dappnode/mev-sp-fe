import { useTheme } from 'next-themes'

interface EthCircleProps {
  size: number
}

export function EthCircle({ size }: EthCircleProps) {
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const colors =
    currentTheme === 'light'
      ? [
          '#fff',
          '#343434',
          '#313131',
          '#151515',
          '#8C8C8C',
          '#8A8A8A',
          '#353535',
        ]
      : [
          '#3f3f3f',
          '#b7b7b7',
          '#e8e8e8',
          '#fff',
          '#5e5d5d',
          '#5e5d5d',
          '#b7b7b7',
        ]
  return (
    <svg
      fill="none"
      height={size}
      viewBox="0 0 151 151"
      width={size}
      xmlns="http://www.w3.org/2000/svg">
      <path
        clipRule="evenodd"
        d="M75.5 0a75.502 75.502 0 0 1 69.753 46.607 75.505 75.505 0 0 1-16.366 82.28 75.505 75.505 0 0 1-82.28 16.366A75.502 75.502 0 0 1 75.5 0Z"
        fill={colors[0]}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M75.5 16.212 95.364 45.89l19.863 29.686L75.5 95.59 35.773 75.5l19.864-29.685L75.5 16.212Zm0 87.374L37.977 83.565 75.5 134.788l37.524-51.223L75.5 103.586Z"
        fill={colors[1]}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="m75.5 16.212 19.863 29.603L115.227 75.5 75.5 60.503V16.212Z"
        fill={colors[1]}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="m75.5 103.586 37.599-20.021L75.5 134.864v-31.278Z"
        fill={colors[2]}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M75.5 60.503 115.227 75.5 75.5 95.514V60.503Z"
        fill={colors[3]}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M75.5 16.212 55.637 45.815 35.773 75.5 75.5 60.503V16.212Z"
        fill={colors[4]}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M75.5 103.586 37.977 83.565 75.5 134.864v-31.278Z"
        fill={colors[5]}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M75.5 60.503 35.773 75.5 75.5 95.514V60.503Z"
        fill={colors[6]}
        fillRule="evenodd"
      />
    </svg>
  )
}
