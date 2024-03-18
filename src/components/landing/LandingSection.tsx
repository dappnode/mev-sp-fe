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
      className="group relative flex flex-col  pt-40  pb-20 transition-all duration-1000 ease-in-out hover:scale-110"
      style={{ backgroundColor: color }}>
      {children}
    </div>
  )
}
