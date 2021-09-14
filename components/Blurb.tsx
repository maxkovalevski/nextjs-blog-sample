import React, { FC } from 'react';
import { MDXLayoutRenderer } from './MDXLayoutRenderer';

import { TwitterFollowButton } from './TwitterFollowButton';
import { GitHubFollowButton } from './GitHubFollowButton';

import siteMetadata from '../siteMetadata';

export const Blurb: FC = ({ children }) => {
  return <div>
    <MDXLayoutRenderer
      mdxSource={children}
    />
    {siteMetadata.githubUsername && (
      <GitHubFollowButton username={siteMetadata.githubUsername} />
    )}
    {siteMetadata.twitterUsername && (
      <TwitterFollowButton username={siteMetadata.twitterUsername} />
    )}
  </div>
}

