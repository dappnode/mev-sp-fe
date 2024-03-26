/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from 'react'
import Hero from '@/components/home/Hero'
import WhySmooth from '@/components/home/WhySmooth'
import HowToSubscribe from '@/components/home/HowToSubscribe'
import Donate from '@/components/home/Donate'
import FAQs from '@/components/home/FAQs'
import JoinSmooth from '@/components/home/JoinSmooth'
import Stats from '@/components/home/Stats'

export default function Landing() {


  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      const targetElement = document.getElementById('target-section');
      targetElement?.scrollIntoView({ behavior: 'smooth' });
    };
    const learnMoreLink = document.getElementById('learn-more-link');
    learnMoreLink?.addEventListener('click', handleClick);
    return () => {
      learnMoreLink?.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
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
