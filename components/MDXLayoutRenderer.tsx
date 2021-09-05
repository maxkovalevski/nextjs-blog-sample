/* eslint-disable react/display-name */
import { FC, useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import NextImage from "next/image";
import CustomLink from "./CustomLink";
// import TOCInline from "./TOCInline";
import { Pre } from "./Pre";

export const MDXComponents = {
  Image: NextImage,
  //   TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }: any) => {
    const Layout = require(`../layouts/${layout}`).default;
    return <Layout {...rest} />;
  },
};

// interface Props extends MDXContentProps {

// }

export const MDXLayoutRenderer: FC<any> = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
