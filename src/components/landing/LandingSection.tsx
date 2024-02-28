import { ReactNode } from 'react'

interface LandingSectionProps {
  children: ReactNode
  color: string
}
export default function LandingSection({
  children,
  color,
}: LandingSectionProps) {
  return (
    <div
      className="relative flex flex-col  pt-40 transition-all duration-1000 ease-in-out hover:py-60 "
      style={{ backgroundColor: color }}>
      {children}
    </div>
  )
}
