/* eslint-disable react/display-name */
import React, { FC, useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import NextLink from 'next/link';
import { PostBanner } from 'nocturnal-ui-react';

import CustomLink from "./CustomLink";
import { CustomImage } from './CustomImage';
import { Pre } from "./Pre";
import  { DEFAULT_LAYOUT } from '../lib/constants'
import { useConvertkitEmailSubscription } from '../hooks';

export const MDXComponents = {
  Image: (props: any) => <div style={{ maxWidth: '700px', margin: '0 auto 1.5em auto' }}>
    <CustomImage {...props} layout="responsive" />
  </div>,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }: any) => {
    const Layout = require(`../layouts/${layout}`).default;
    return <Layout {...rest} />;
  },
};

export const MDXLayoutRenderer: FC<any> = ({ layout = DEFAULT_LAYOUT, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource, {
    '_nextLink': NextLink,
    '_convertkitEndpoint': process.env.CONVERTKIT_ENDPOINT || '',
    '_postBanner': PostBanner,
    '_useConvertkitEmailSubscription': useConvertkitEmailSubscription,
  }), [mdxSource, NextLink]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
