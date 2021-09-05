import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import React from "react";

import { MDXLayoutRenderer } from "../../components/MDXLayoutRenderer";

import { POST_DEFAULT_LAYOUT } from "../../lib/constants";
import { formatSlug } from "../../lib/formatSlug";
import { getAllFilesFrontMatter } from "../../lib/getAllFilesFrontMatter";
import { getFileByName } from "../../lib/getFileByName";
import { getFiles } from "../../lib/getFiles";

const NotePage: NextPage<{
  note: any;
}> = ({ note }) => {
  const { mdxSource, frontMatter } = note;

  return (
    <>
      <Head>
        <title>{note.title}</title>
        <meta name="description" content={note.excerpt} />
      </Head>
      {/* <PostContent post={post} /> */}
      <MDXLayoutRenderer
        layout={frontMatter.layout || POST_DEFAULT_LAYOUT}
        // toc={toc}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
    </>
  );
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string[] }>) {
  const allPosts = await getAllFilesFrontMatter(["note"]);
  const postIndex = allPosts.findIndex((post) => post.slug === params?.slug.join("/"));

  const postData = allPosts[postIndex];

  const note = await getFileByName(postData.fileName);

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
