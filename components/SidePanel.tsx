import React, { FC } from 'react';
import { Avatar, InfoCard, PostTags, SidePanel as Panel } from 'nocturnal-ui-react';
import Link from 'next/link';

import { MDXLayoutRenderer } from './MDXLayoutRenderer';

import avatarImg from '../static/img/avatar.jpeg';

interface Props {
  blurbContent: string;
  tags: {
      name: string;
      link?: string | undefined;
  }[];
}

export const SidePanel: FC<Props> = ({ blurbContent, tags }) => {
  return (
      <Panel position="left">
        <InfoCard>
          <Avatar src={avatarImg.src} />
          <MDXLayoutRenderer
            mdxSource={blurbContent}
          />
        </InfoCard>
        <InfoCard>
          <h3 className="monospace">Tags</h3>
          <PostTags direction="column" tags={tags} maxCount={8} linkView={({ to, children, ...props }) => <Link href={to}><a {...props}>{children}</a></Link>} />
          <Link href="/tags"><a className="underline theme-link">...more</a></Link>
        </InfoCard>
      </Panel>
  );
}

