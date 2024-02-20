import { ThemeProvider } from 'next-themes'

interface NextThemeProviderProps {
  children: React.ReactNode
}

export function NextThemeProvider({ children }: NextThemeProviderProps) {
  return (
    <ThemeProvider enableSystem attribute="class">
      {children}
    </ThemeProvider>
  )
}
