import React, { FC } from 'react';

import { Plausible } from './Plausible';

import siteMetadata from '../siteMetadata';

const isProduction = process.env.NODE_ENV === 'production'

export const Analytics: FC = () => {
  return <>
      {isProduction && siteMetadata.analytics.plausibleDataDomain && <Plausible />}
  </>;
}
