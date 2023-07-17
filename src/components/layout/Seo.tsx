import React from 'react'
import { DefaultSeo } from 'next-seo'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_TWITTER,
} from '@/utils/config'

export function Seo() {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : SITE_URL

  return (
    <DefaultSeo
      defaultOpenGraphImageHeight={630}
      defaultOpenGraphImageWidth={1200}
      defaultTitle={SITE_NAME}
      description={SITE_DESCRIPTION}
      title={SITE_NAME}
      titleTemplate={`%s | ${SITE_NAME}`}
      openGraph={{
        type: 'website',
        siteName: SITE_NAME,
        url: origin,
        images: [
          {
            url: `${origin}/og.png`,
            alt: `${SITE_NAME} Open Graph Image`,
          },
        ],
      }}
      twitter={{
        handle: `@${SOCIAL_TWITTER}`,
        site: `@${SOCIAL_TWITTER}`,
        cardType: 'summary_large_image',
      }}
    />
  )
}
