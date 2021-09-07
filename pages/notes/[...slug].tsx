import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { MainLayout } from "../../components/MainLayout";

import { MDXLayoutRenderer } from "../../components/MDXLayoutRenderer";

import { NOTE_LAYOUT } from "../../lib/constants";
import { getAllFilesFrontMatter } from "../../lib/getAllFilesFrontMatter";
import { getFileByName } from "../../lib/getFileByName";
import { getFiles } from "../../lib/getFiles";

const NotePage: NextPage<{
  note: any;
}> = ({ note }) => {
  const { mdxSource, frontMatter } = note;

  return (
    <MainLayout>
      <Head>
        <title>{note.title}</title>
        <meta name="description" content={note.excerpt} />
      </Head>
      <MDXLayoutRenderer
        layout={frontMatter.layout || NOTE_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
    </MainLayout>
  );
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string[] }>) {
  const allPosts = await getAllFilesFrontMatter(["note"]);
  const postIndex = allPosts.findIndex((post) => post.slug === params?.slug.join("/"));

  const postData = allPosts[postIndex];

  const note = await getFileByName(postData.fileName || '');

  return {
    props: {
      note,
    },
  };
}

export function getStaticPaths() {
  const posts = getFiles();

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(".mdx", "").replace(".md", "").split("/"),
      },
    })),
    fallback: false,
  };
}

export default NotePage;
