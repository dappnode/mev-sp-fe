import { useTheme } from 'next-themes'
import LandingSection from '@/components/landing/LandingSection'
import WaveSeparator from '@/components/landing/WaveSeparator'

export default function Landing() {
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  const sectionColors: string[] =
    currentTheme === 'light'
      ? ['#7F27FF', '#9147FF', '#B685FF', '#CEADFF', '#E7D6FF']
      : ['#121212', '#282828', '#3f3f3f', '#575757', '#717171']
  return (
    <div>
      <LandingSection color={sectionColors[0]}>
        <div>aaa</div>
        <div>aaa</div>
        <div>aaa</div>
        <div>aaa</div>
        <div>aaa</div>
        <div>aaa</div>
      </LandingSection>

      <LandingSection color={sectionColors[1]}>
        <WaveSeparator color={sectionColors[0]} number={0} />
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
      </LandingSection>

      <LandingSection color={sectionColors[2]}>
        <WaveSeparator color={sectionColors[1]} number={1} />
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
      </LandingSection>

      <LandingSection color={sectionColors[3]}>
        <WaveSeparator color={sectionColors[2]} number={0} />
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
      </LandingSection>

      <LandingSection color={sectionColors[4]}>
        <WaveSeparator rotated color={sectionColors[3]} number={1} />
        <p>aaa</p>
      </LandingSection>
    </div>
  )
}
