/* eslint-disable react/display-name */
import { FC, useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import NextImage from "next/image";

import CustomLink from "./CustomLink";
import { Pre } from "./Pre";
import  { DEFAULT_LAYOUT } from '../lib/constants'

export const MDXComponents = {
  Image: (props: any) => <div style={{ maxWidth: '700px', margin: '0 auto 1.5em auto' }}>
    <NextImage {...props} layout="responsive" />
  </div>,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }: any) => {
    const Layout = require(`../layouts/${layout}`).default;
    return <Layout {...rest} />;
  },
};

export const MDXLayoutRenderer: FC<any> = ({ layout = DEFAULT_LAYOUT, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
