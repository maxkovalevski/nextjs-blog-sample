import { GetStaticPropsContext, NextPage } from "next";
import React from "react";

import { MDXLayoutRenderer } from "../../components/MDXLayoutRenderer";

import { CONTENT_TYPE_NOTE, NOTE_LAYOUT } from "../../lib/constants";
import { getAllFilesFrontMatter } from "../../lib/getAllFilesFrontMatter";
import { getFileByName } from "../../lib/getFileByName";
import { getFilesPaths } from "../../lib/getFilesPaths";
import { PostFrontMatter } from "../../types";

const NotePage: NextPage<{
  note: {
    frontMatter: PostFrontMatter;
    mdxSource: string;
  };
}> = ({ note }) => {
  const { mdxSource, frontMatter } = note;

  return (
    <>
      <MDXLayoutRenderer
        layout={frontMatter.layout || NOTE_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
        seoProps={{
          title: frontMatter.title || "Note",
          description: frontMatter.excerpt,
          keywords: frontMatter.keywords,
        }}
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

  const note = await getFileByName(postData.fileName || '');


  return {
    props: {
      note,
    },
  };
}

export function getStaticPaths() {
  const posts = getFilesPaths([CONTENT_TYPE_NOTE]);

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
