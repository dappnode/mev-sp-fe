import React from 'react'
import Image from 'next/image'
import styles from '@/styles/stats.module.css'

interface ChartBannerProps {
  textBeforeLink: string
  link: string
  linkText: string
  textAfterLink: string
  theme: string | undefined
}

function ChartBanner({
  textBeforeLink,
  link,
  linkText,
  textAfterLink,
  theme,
}: ChartBannerProps) {
  const bannerClass = `${styles.banner} ${theme === 'dark' ? styles.dark : ''}`

  // Use an anchor tag to make the entire banner clickable
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={bannerClass}
      style={{ textDecoration: 'none' }}>
      {textBeforeLink}
      <Image
        height={24}
        width={24}
        src="/images/dappnode-logo.svg"
        alt="Dappnode Logo"
        className={styles.logo}
      />
      {linkText}
      {textAfterLink}
    </a>
  )
}

export default ChartBanner
