import { useTheme } from 'next-themes'

interface CurrencyCircleProps {
  size: number
}

export function CurrencyCircle({ size }: CurrencyCircleProps) {
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const color = currentTheme === 'light' ? '#fff' : '#3f3f3f'
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
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  )
}
