import { NextPage } from "next";
import React from "react";

import { MainLayout } from "../../components/MainLayout";
import { MDXLayoutRenderer } from "../../components/MDXLayoutRenderer";
import { PAGE_LAYOUT } from "../../lib/constants";
import { getNotesHomePageContent } from "../../lib/getNotesHomePageContent";

interface Props {
  content: any;
}

const NotesPage: NextPage<Props> = ({ content }) => {
  const { frontMatter, mdxSource } = content;

  return (
    <MainLayout>
      <MDXLayoutRenderer
        layout={frontMatter.layout || PAGE_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
    </MainLayout>
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
