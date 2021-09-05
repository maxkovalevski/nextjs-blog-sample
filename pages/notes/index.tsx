import { NextPage } from "next";
import React from "react";
import { MDXLayoutRenderer } from "../../components/MDXLayoutRenderer";
import { POST_DEFAULT_LAYOUT } from "../../lib/constants";
import { getNotesHomePageContent } from "../../lib/getNotesHomePageContent";

interface Props {
  content: any;
}

const NotesPage: NextPage<Props> = ({ content }) => {
  const { frontMatter, mdxSource } = content;

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || POST_DEFAULT_LAYOUT}
      // toc={toc}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  );
};

export const getStaticProps = async () => {
  const content = await getNotesHomePageContent();

  return {
    props: {
      content,
    },
  };
};

export default NotesPage;
