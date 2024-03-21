import { ReactNode } from 'react'

interface LandingSectionProps {
  children: ReactNode
  color: string
  hasBg?: boolean
}
export default function LandingSection({
  children,
  color,
  hasBg = false,
}: LandingSectionProps) {
  return (
    <div
      style={hasBg ? { backgroundColor: color } : {}}
      className={`group relative flex flex-col  pt-40  pb-20 transition-all duration-1000 ease-in-out hover:scale-110 overflow-x-visible ${
        !hasBg && 'bg-wave-pattern bg-cover dark:bg-wave-pattern-dark'
      }`}>
      {children}
    </div>
  )
}
