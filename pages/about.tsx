import { NextPage } from "next";
import React from "react";

import { MDXLayoutRenderer } from "../components/MDXLayoutRenderer";
import { PAGE_LAYOUT } from "../lib/constants";
import { getAboutPageContent } from "../lib/getAboutPageContent";

interface Props {
  content: any;
}

const AboutPage: NextPage<Props> = ({ content }) => {
  const { frontMatter, mdxSource } = content;

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || PAGE_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  );
};

export const getStaticProps = async () => {
  const content = await getAboutPageContent();

  return {
    props: {
      content,
    },
  };
};

export default AboutPage;
