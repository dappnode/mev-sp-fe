import { useTheme } from 'next-themes'

export function HowToStep1() {
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const colors =
    currentTheme === 'light' ? ['#D3C8F0', '#002C41'] : ['#625582', '#fff']
  // [0] => lightViolet / darkViolet
  // [1] => darkBlue / white

  return (
    <svg
      fill="none"
      height="160"
      width="160"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" fill={colors[0]} r="80" />
      <path
        d="m48.889 84.444 17.777 17.778 44.445-44.444"
        stroke={colors[1]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="18"
      />
    </svg>
  )
}
