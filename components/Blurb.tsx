import React, { FC } from 'react';
import { MDXLayoutRenderer } from './MDXLayoutRenderer';

export const Blurb: FC = ({ children }) => {
  return <div>
    <MDXLayoutRenderer
      mdxSource={children}
    />
  </div>
}

