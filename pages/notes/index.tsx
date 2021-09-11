import { NextPage } from "next";
import React from "react";

import { MDXLayoutRenderer } from "../../components/MDXLayoutRenderer";
import { PAGE_LAYOUT } from "../../lib/constants";
import { getNotesHomePageContent } from "../../lib/getNotesHomePageContent";

interface Props {
  content: any;
}

const NotesPage: NextPage<Props> = ({ content }) => {
  const { frontMatter, mdxSource } = content;

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || PAGE_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
      breadcrumbsItems={[{ to: "/", label: "Home" }, { label: "Notes" }]}
      title="Notes"
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
