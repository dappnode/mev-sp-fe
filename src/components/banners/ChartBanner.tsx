import React from 'react';
import styles from '@/styles/stats.module.css';

interface ChartBannerProps {
  textBeforeLink: string;
  link: string;
  linkText: string;
  textAfterLink: string;
  theme: string | undefined;
}

const ChartBanner: React.FC<ChartBannerProps> = ({ textBeforeLink, link, linkText, textAfterLink, theme }) => {
  const bannerClass = `${styles.banner} ${theme === 'dark' ? styles.dark : ''}`;

  // Use an anchor tag to make the entire banner clickable
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={bannerClass} style={{ textDecoration: 'none' }}>
      {textBeforeLink}
      <img src="/images/dappnode-logo.svg" alt="Dappnode Logo" className={styles.logo} />
      {linkText}
      {textAfterLink}
    </a>
  );
};

export default ChartBanner;
