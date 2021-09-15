import Script from 'next/script'

import siteMetadata from '../siteMetadata';

export const Plausible = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        data-domain={siteMetadata.analytics.plausibleDataDomain}
        src="https://plausible.io/js/plausible.js"
      />
      <Script strategy="lazyOnload">
        {`
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
        `}
      </Script>
    </>
  )
}


// https://plausible.io/docs/custom-event-goals
export const logEvent = (eventName: string, ...rest: unknown[]) => {
  return (window as typeof window & { plausible: any; }).plausible?.(eventName, ...rest);
}

