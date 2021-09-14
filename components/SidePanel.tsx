import React, { FC } from 'react';
import { Avatar, InfoCard, PostTags, SidePanel as Panel } from 'nocturnal-ui-react';
import Link from 'next/link';

import { MDXLayoutRenderer } from './MDXLayoutRenderer';

import avatarImg from '../static/img/avatar.jpeg';
import { LinkView } from './LinkView';
import { Icon } from './Icon';
import { icons } from '../icons';

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
          <h3 className="monospace"
            style={{
              fontWeight: "bold",
              height: "22px",
              lineHeight: "1",
              display: "flex",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <span style={{ marginRight: "15px" }}>Tags</span>{" "}
            <Icon src={icons.emojiLabel.src} widthSize="25px" />
          </h3>
          <PostTags direction="column" tags={tags} maxCount={8} linkView={(props) => <LinkView {...props} />} />
          <Link href="/tags"><a style={{
            textDecoration: 'underline',
            color: '#e2e2e2'
          }}>...more</a></Link>
        </InfoCard>
      </Panel>
  );
}

