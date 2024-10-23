import Hero from '@/components/home/Hero'
import HowToSubscribe from '@/components/home/HowToSubscribe'
import Donate from '@/components/home/Donate'
import FAQs from '@/components/home/FAQs'
import JoinSmooth from '@/components/home/JoinSmooth'
import Stats from '@/components/home/Stats'
import WhySmooth from '@/components/home/WhySmooth'
import SlidingBanner from '@/components/banners/SlidingBanner'

export default function Home() {
  return (
    <>
     <SlidingBanner
        title="SmoothDAO Proposal "
        btnText="Click here"
        text="Discuss and decide the future of Smooth!"
        link="https://link.dappnode.io/7bhotl6"
      />
      <Hero />
      <Stats />
      <WhySmooth />
      <HowToSubscribe />
      <Donate />
      <FAQs />
      <JoinSmooth />
    </>
  )
}
