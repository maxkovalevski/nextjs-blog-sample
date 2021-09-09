import { NextPage } from "next";
import React from "react";

import { MDXLayoutRenderer } from "../components/MDXLayoutRenderer";
import { PAGE_LAYOUT } from "../lib/constants";
import { getAboutPageContent } from "../lib/getAboutPageContent";
import { PostFrontMatter } from "../types";

interface Props {
  content: {
    mdxSource: string;
    frontMatter: PostFrontMatter;
  };
}

const AboutPage: NextPage<Props> = ({ content }) => {
  const { frontMatter, mdxSource } = content;

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || PAGE_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
      breadcrumbsItems={[{ to: "/", label: "Home" }, { label: "About" }]}
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
