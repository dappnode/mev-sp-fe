import { Html, Head, Main, NextScript } from 'next/document'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Document() {
  const gaId =
    process.env.NEXT_PUBLIC_SELECTED_CHAIN === 'goerli'
      ? 'G-CZ1Q4XLCV7'
      : 'G-C7R9Y6T56G'

  console.log('Google Analytics ID:', gaId)
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      {process.env.NEXT_PUBLIC_SELECTED_CHAIN && (
        <GoogleAnalytics gaId={gaId} />
      )}
    </Html>
  )
}
