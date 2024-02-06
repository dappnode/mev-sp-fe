import { useTheme } from 'next-themes'
import Image from 'next/image'

export function ToggleThemeBtn() {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  return (
    <button
      className="rounded-full p-2 transition-all ease-in-out  hover:bg-SkeletonGray dark:hover:bg-DAppDarkSurface/300"
      type="button"
      onClick={() =>
        currentTheme === 'dark' ? setTheme('light') : setTheme('dark')
      }>
      <Image
        alt="logo"
        height={30}
        src={`/images/${currentTheme === 'dark' ? 'sun' : 'moon'}.svg`}
        width={30}
      />
    </button>
  )
}
